import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription, NodeApiError,
} from 'n8n-workflow';
import {NodeConnectionType, NodeOperationError} from 'n8n-workflow';
import {generateListRequest, ListInvoicesFilter, ListLimit} from './utils/xmlGenerator';
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
						value: 'listVydejkaRequest',
						description: 'Issues agenda.',
					},
					{
						name: 'Pokladní doklady',
						value: 'listVoucherRequest',
						description: 'Cash register documents agenda.',
					},
					{
						name: 'Nabídky',
						value: 'listOfferRequest',
						description: 'Offers agenda.',
					},
					{
						name: 'Výroba',
						value: 'listVyrobaRequest',
						description: 'Production agenda.',
					},
					{
						name: 'Interní doklady',
						value: 'listIntDocRequest',
						description: 'Internal documents agenda.',
					},
					{
						name: 'Poptávky',
						value: 'listEnquiryRequest',
						description: 'Enquiries agenda.',
					},
					{
						name: 'Převod',
						value: 'listPrevodkaRequest',
						description: 'Transfers agenda.',
					},
					{
						name: 'Banka',
						value: 'listBankRequest',
						description: 'Bank agenda.',
					},
					{
						name: 'Zakázky',
						value: 'listContractRequest',
						description: 'Contracts agenda.',
					},
					{
						name: 'Pohyby',
						value: 'listMovementRequest',
						description: 'Movements agenda.',
					},
					{
						name: 'Účetní deník (PÚ)',
						value: 'listAccountancyRequest',
						description: 'Accounting journal (PÚ) agenda.',
					},
				],
			},
			{
				displayName: 'Invoice Type',
				name: 'entityDetailType',
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
					}
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

			{
				displayName: 'Start Record ID',
				name: 'idFrom',
				type: 'number',
				default: "",
				displayOptions: {
					show: {
						operation: ['export'],
					},
				},
				description: 'Minimální hodnota ID záznamu, od kterého se provede export',
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
						name: 'entityDetailType',
						displayOptions: {
							show: {
								operation: ['export'],
								actionEntity: ['listInvoiceRequest'],
							}
						},
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
					const filter = this.getNodeParameter('filter', itemIndex, {}) as ListInvoicesFilter;

					const limit = {
						count: this.getNodeParameter('count', itemIndex) as number,
						idFrom: this.getNodeParameter('idFrom', itemIndex) as number
					} as ListLimit;

					// Ensure dateFrom and dateTill are in the correct format (YYYY-MM-DD)
					if (filter.dateFrom) {
						filter.dateFrom = new Date(filter.dateFrom).toISOString().split('T')[0];
					}
					if (filter.dateTill) {
						filter.dateTill = new Date(filter.dateTill).toISOString().split('T')[0];
					}

					let xmlRequest;
					if (actionEntity === 'listInvoiceRequest') {
						const entityDetailType = this.getNodeParameter('entityDetailType', itemIndex) as string;
						const listAttrs = {
							version: '2.0',
							invoiceType: entityDetailType,
							invoiceVersion: '2.0',
							request: 'lst:requestInvoice'
						};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listBankRequest') {
						const listAttrs = {version: '2.0', bankVersion: '2.0', request: 'lst:requestBank'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listAccountancyRequest') {
						const listAttrs = {version: '2.0', accountancyVersion: '2.0', request: 'lst:requestAccountancy'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listIntDocRequest') {
						const listAttrs = {version: '2.0', intDocVersion: '2.0', request: 'lst:requestIntDoc'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listVoucherRequest') {
						const listAttrs = {version: '2.0', voucherVersion: '2.0', request: 'lst:requestVoucher'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listProdejkaRequest') {
						const listAttrs = {version: '2.0', prodejkaVersion: '2.0', request: 'lst:requestProdejka'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listPrevodkaRequest') {
						const listAttrs = {version: '2.0', prevodkaVersion: '2.0', request: 'lst:requestPrevodka'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listVyrobaRequest') {
						const listAttrs = {version: '2.0', vyrobaVersion: '2.0', request: 'lst:requestVyroba'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listVydejkaRequest') {
						const listAttrs = {version: '2.0', vydejkaVersion: '2.0', request: 'lst:requestVydejka'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listPrijemkaRequest') {
						const listAttrs = {version: '2.0', prijemkaVersion: '2.0', request: 'lst:requestPrijemka'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listEnquiryRequest') {
						const listAttrs = {version: '2.0', enquiryVersion: '2.0', request: 'lst:requestEnquiry'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listOfferRequest') {
						const listAttrs = {version: '2.0', offerVersion: '2.0', request: 'lst:requestOffer'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listOrderRequest') {
						// TODO missing selector for order type
						const listAttrs = {
							version: '2.0',
							orderVersion: '2.0',
							orderType: "issuedOrder",
							request: 'lst:requestOrder'
						};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'listMovementRequest') {
						const listAttrs = {version: '2.0', movementVersion: '2.0', request: 'lst:requestMovement'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else {
						throw new NodeApiError(this.getNode(), {
							message: `Not implemented for ${actionEntity}`
						});
					}


					console.log('Request', xmlRequest);

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

					const xmlStr = utfConvert ? iconv.decode(respBuffer, "win1250").replace(`encoding="Windows-1250"`, `encoding="utf-8"`) : respBuffer.toString();
					const jsonResponse = convert(xmlStr.replace("\ufeff", ""), {format: "object"}) as any;
					const respPack = jsonResponse["rsp:responsePack"] as any;

					console.log('respPack', JSON.stringify(respPack, null, 4));

					if (respPack['@state'] != "ok") {
						throw new NodeApiError(this.getNode(), {
							message: respPack['@note'],
						});
					}

					const respPackItem = respPack['rsp:responsePackItem'] as any;
					if (respPackItem['@state'] != "ok") {
						throw new NodeApiError(this.getNode(), {
							message: respPackItem['@note'],
						});
					}

					if (xmlOutputFormat)
						returnData.push({
							json: {xml: xmlStr},
							pairedItem: itemIndex,
						});
					else {
						let extractedData = extractLstElements(respPackItem);
						const outArray = Array.isArray(extractedData)
							? extractedData
							: [extractedData];

						outArray.forEach((item: any) => {
							returnData.push({
								json: item,
								pairedItem: itemIndex,
							});
						});
					}


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

function extractLstElements(obj: any): any {
	for (const key in obj) {
		if (key.startsWith('lst:')) {
			let subObj = obj[key];
			for (const key2 in subObj) {
				if (key2.startsWith('lst:')) {
					return subObj[key2];
				}
			}
		}
	}
}
