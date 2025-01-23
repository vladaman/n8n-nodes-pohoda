import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import {NodeConnectionType, NodeOperationError} from 'n8n-workflow';
import {generateListInvoicesRequest} from './utils/xmlGenerator';
import iconv from 'iconv-lite';
import {convert} from 'xmlbuilder2';

export class PohodaNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pohoda Node',
		name: 'pohodaNode',
		group: ['transform'],
		version: 1,
		icon: 'file:pohodaNode.png',
		description: 'Stormware Pohoda Integration Node',
		defaults: {
			name: 'Pohoda Node',
		},
		credentials: [
			{
				name: 'pohodaAuthApi',
				required: true,
			},
		],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			// Operation selection
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Export',
						value: 'export',
					},
					{
						name: 'Import',
						value: 'import',
					},
				],
				default: 'export'
			},

			{
				displayName: 'Entity',
				name: 'actionEntity',
				type: 'options',
				default: 'Faktury',
				displayOptions: {
					show: {
						operation: ['export', 'import'],
					},
				},
				options: [
					{
						name: 'Faktury',
						value: 'listInvoiceRequest',
						description: 'Invoices agenda.',
					},
					{
						name: 'Příjemky',
						value: 'listPrijemkaRequest',
						description: 'Receipts agenda.',
					},
					{
						name: 'Prodejky',
						value: 'listProdejkaRequest',
						description: 'Sales receipts agenda.',
					},
					{
						name: 'Objednávky',
						value: 'listOrderRequest',
						description: 'Orders agenda.',
					},
					{
						name: 'Výdejky',
						value: 'Vydejky',
						description: 'Issues agenda.',
					},
					{
						name: 'Pokladní doklady',
						value: 'PokladniDoklady',
						description: 'Cash register documents agenda.',
					},
					{
						name: 'Nabídky',
						value: 'Nabidky',
						description: 'Offers agenda.',
					},
					{
						name: 'Výroba',
						value: 'Vyroba',
						description: 'Production agenda.',
					},
					{
						name: 'Interní doklady',
						value: 'InterniDoklady',
						description: 'Internal documents agenda.',
					},
					{
						name: 'Poptávky',
						value: 'Poptavky',
						description: 'Enquiries agenda.',
					},
					{
						name: 'Převod',
						value: 'Prevod',
						description: 'Transfers agenda.',
					},
					{
						name: 'Banka',
						value: 'Banka',
						description: 'Bank agenda.',
					},
					{
						name: 'Zakázky',
						value: 'Zakazky',
						description: 'Contracts agenda.',
					},
					{
						name: 'Pohyby',
						value: 'Pohyby',
						description: 'Movements agenda.',
					},
					{
						name: 'Účetní deník (PÚ)',
						value: 'UcetniDenikPU',
						description: 'Accounting journal (PÚ) agenda.',
					},
				],
			},
			{
				displayName: 'Invoice Type',
				name: 'invoiceType',
				type: 'options',
				default: 'issuedInvoice',
				displayOptions: {
					show: {
						actionEntity: ['listInvoiceRequest'],
					},
				},
				options: [
					{
						name: 'Issued Invoice',
						value: 'issuedInvoice'
					},
					{
						name: 'Issued Advance Invoice',
						value: 'issuedAdvanceInvoice'
					},
					{
						name: 'Received Invoice',
						value: 'receivedInvoice'
					},
					{
						name: 'Received Advance Invoice',
						value: 'receivedAdvanceInvoice'
					},
				]
			},

			// Filter for listing invoices
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						operation: ['export'],
					},
				},

				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'Filter by document ID',
					},
					{
						displayName: 'External ID',
						name: 'extId',
						type: 'string',
						default: '',
						description: 'Filter by external ID',
					},
					{
						displayName: 'Date From',
						name: 'dateFrom',
						type: 'dateTime',
						default: '',
						description: 'Filter invoices by date from',
					},
					{
						displayName: 'Date Till',
						name: 'dateTill',
						type: 'dateTime',
						default: '',
						description: 'Filter invoices by date till',
					},
					{
						displayName: 'Last Changes',
						name: 'lastChanges',
						type: 'dateTime',
						default: '',
						description: 'Filter invoices by last changes date',
					},
					{
						displayName: 'Last Changes',
						name: 'lastChanges',
						type: 'dateTime',
						default: '',
						description: 'Filter invoices by last changes date',
					},
					{
						displayName: 'Company Name',
						name: 'companyName',
						type: 'string',
						default: '',
						description: 'Filter invoices by company name',
					},
					{
						displayName: 'Company IČO',
						name: 'selectedIco',
						type: 'string',
						default: '',
						description: 'Filter invoices by company IČO',
					}
				],
			},

			{
				displayName: 'Return Records Count',
				name: 'count',
				type: 'number',
				default: 10,
				displayOptions: {
					show: {
						operation: ['export'],
					},
				},
				description: 'Range 1 to 10000',
			},

			// Invoice Header
			{
				displayName: 'Invoice Header',
				name: 'invoiceHeader',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'createInvoice',
							'createCreditNote',
							'createDebitNote',
							'createAdvanceInvoice',
							'createProformaInvoice',
						],
					},
				},
				options: [
					{
						displayName: 'Invoice Type',
						name: 'invoiceType',
						type: 'options',
						options: [
							{name: 'Issued Invoice', value: 'issuedInvoice'},
							{name: 'Issued Credit Note', value: 'issuedCreditNotice'},
							{name: 'Issued Debit Note', value: 'issuedDebitNote'},
							{name: 'Issued Advance Invoice', value: 'issuedAdvanceInvoice'},
							{name: 'Issued Proforma Invoice', value: 'issuedProformaInvoice'},
						],
						default: 'issuedInvoice',
						description: 'Type of the invoice',
					},
					{
						displayName: 'Invoice Number',
						name: 'invoiceNumber',
						type: 'string',
						default: '',
						description: 'The invoice number',
					},
					{
						displayName: 'Customer Name',
						name: 'customerName',
						type: 'string',
						default: '',
						description: 'The name of the customer',
					},
					{
						displayName: 'Date',
						name: 'date',
						type: 'dateTime',
						default: '',
						description: 'The date of the invoice',
					},
					{
						displayName: 'Due Date',
						name: 'dueDate',
						type: 'dateTime',
						default: '',
						description: 'The due date of the invoice',
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
						description: 'Additional text for the invoice',
					},
				],
			},



			// Invoice Items
			{
				displayName: 'Invoice Items',
				name: 'invoiceItems',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Item',
				default: [],
				displayOptions: {
					show: {
						operation: [
							'createInvoice',
							'createCreditNote',
							'createDebitNote',
							'createAdvanceInvoice',
							'createProformaInvoice',
						],
					},
				},
				options: [
					{
						displayName: 'Item',
						name: 'item',
						values: [
							{
								displayName: 'Text',
								name: 'text',
								type: 'string',
								default: '',
								description: 'Description of the item',
							},
							{
								displayName: 'Quantity',
								name: 'quantity',
								type: 'number',
								default: 1,
								description: 'Quantity of the item',
							},
							{
								displayName: 'Unit Price',
								name: 'unitPrice',
								type: 'number',
								default: 0,
								description: 'Unit price of the item',
							},
							{
								displayName: 'VAT Rate',
								name: 'vatRate',
								type: 'options',
								options: [
									{name: '0%', value: '0'},
									{name: '10%', value: '10'},
									{name: '15%', value: '15'},
									{name: '21%', value: '21'},
								],
								default: '21',
								description: 'VAT rate for the item',
							},
						],
					},
				],
			},
			// Invoice Summary
			{
				displayName: 'Invoice Summary',
				name: 'invoiceSummary',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'createInvoice',
							'createCreditNote',
							'createDebitNote',
							'createAdvanceInvoice',
							'createProformaInvoice',
						],
					},
				},
				options: [
					{
						displayName: 'Total Amount',
						name: 'totalAmount',
						type: 'number',
						default: 0,
						description: 'Total amount of the invoice',
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: 'CZK',
						description: 'Currency of the invoice',
					},
				],
			},


			{
				displayName: 'XML Output',
				name: 'xmlOutput',
				type: 'boolean',
				default: false
			},
			{
				displayName: 'Convert to UTF8',
				name: 'utfConvert',
				type: 'boolean',
				default: true
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('pohodaAuthApi');

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as string;
				const actionEntity = this.getNodeParameter('actionEntity', itemIndex) as string;
				const xmlOutputFormat = this.getNodeParameter('xmlOutput', itemIndex) as boolean;
				const utfConvert = this.getNodeParameter('utfConvert', itemIndex) as boolean;

				if (operation === 'export') {
					const invoiceType = this.getNodeParameter('invoiceType', itemIndex) as string;
					const filter = this.getNodeParameter('filter', itemIndex, {}) as {
						id?: string;
						extId?: string;
						dateFrom?: string;
						dateTill?: string;
						lastChanges?: string;
						selectedIco?: string;
						companyName?: string;
						count?: number;
					};

					// Ensure dateFrom and dateTill are in the correct format (YYYY-MM-DD)
					if (filter.dateFrom) {
						filter.dateFrom = new Date(filter.dateFrom).toISOString().split('T')[0];
					}
					if (filter.dateTill) {
						filter.dateTill = new Date(filter.dateTill).toISOString().split('T')[0];
					}

					const xmlRequest = generateListInvoicesRequest(credentials.ico as string, actionEntity, invoiceType, filter);
					console.log('Request', xmlRequest);
					// Make the API request

					const respBuffer = await this.helpers.httpRequest({
						method: 'POST',
						encoding: 'arraybuffer',
						url: `${credentials.baseUrl}/xml`, // Replace with the actual API endpoint
						headers: {
							'Content-Type': 'application/xml',
							'STW-Application': 'N8N Pohoda Node',
							'STW-Authorization': `Basic ${Buffer.from(
								`${credentials.username}:${credentials.password}`,
							).toString('base64')}`,
						},
						body: xmlRequest,
					});

					let xmlStr = utfConvert ? iconv.decode(respBuffer, "win1250").replace(`encoding="Windows-1250"`, `encoding="utf-8"`) : respBuffer.toString();
					let jsonResponse = convert(xmlStr.replace("\ufeff", ""), {format: "object"});
					let respPack = jsonResponse["rsp:responsePack"];
					console.log('res', respPack);
					// Add the response to the return data
					returnData.push({
						json: {"data": xmlOutputFormat ? xmlStr : respPack['rsp:responsePackItem']},
						error: respPack['@state'] === 'error' ? new NodeOperationError(this.getNode(), respPack['@note']) : undefined,
						pairedItem: itemIndex,
					});
				} else {
					// Handle other operations (e.g., createInvoice, createCreditNote, etc.)
					// ...
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: this.getInputData(itemIndex)[0].json,
						error,
						pairedItem: itemIndex,
					});
				} else {
					if (error.context) {
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [returnData];
	}
}
