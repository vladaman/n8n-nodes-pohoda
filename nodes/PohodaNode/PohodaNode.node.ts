/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription, NodeApiError,
} from 'n8n-workflow';

import {NodeConnectionType, NodeOperationError} from 'n8n-workflow';
import {
	generateCreateRequest,
	generateListRequest,
	generatePrintRequest,
	ListInvoicesFilter,
	ListLimit
} from './utils/xmlGenerator';
import iconv from 'iconv-lite';
import {convert} from 'xmlbuilder2';

// eslint-disable n8n-nodes-base/node-param-display-name-miscased
export class PohodaNode implements INodeType {
	description: INodeTypeDescription = {
		codex: {
			categories: ["Search", "Web"],
			alias: ["web-search", "searxng", "search-engine"],
			subcategories: {
				search: ["Web Search", "Metasearch"],
			},
		},
		credentials: [
			{
				name: 'pohodaAuthApi',
				required: true,
			},
		],
		defaults: {
			name: 'Pohoda Node',
		},
		description: 'Stormware Pohoda Integration Node',
		displayName: 'Pohoda Node',
		group: ['transform'],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:pohodaNode.png',
		name: 'pohodaNode',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [NodeConnectionType.Main],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.Main],
		properties: [
			// Operation selection
			{
				displayName: 'Operation',
				default: 'export',
				name: 'operation',
				noDataExpression: true,
				options: [
					{
						name: 'Export',
						value: 'export',
					},
					{
						name: 'Create Entity',
						value: 'create',
					},
					{
						name: 'Company Info',
						value: 'company-info',
					},
					{
						name: 'Print',
						value: 'print',
					},
				],
				type: 'options'
			},

			{
				displayName: 'Entity',
				default: 'lst:listInvoiceRequest',
				noDataExpression: true,
				displayOptions: {
					show: {
						operation: ['export', 'create'],
					},
				},
				name: 'resource',
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'Faktury',
						value: 'lst:listInvoiceRequest',
						description: 'Invoices agenda',
						displayName: 'List Invoices'
					},
					{
						name: 'Příjemky',
						value: 'lst:listPrijemkaRequest',
						description: 'Receipts agenda',
					},
					{
						name: 'Prodejky',
						value: 'lst:listProdejkaRequest',
						description: 'Sales receipts agenda',
					},
					{
						name: 'Objednávky',
						value: 'lst:listOrderRequest',
						description: 'Orders agenda',
					},
					{
						name: 'Výdejky',
						value: 'lst:listVydejkaRequest',
						description: 'Issues agenda',
					},
					{
						name: 'Pokladní doklady',
						value: 'lst:listVoucherRequest',
						description: 'Cash register documents agenda',
					},
					{
						name: 'Nabídky',
						value: 'lst:listOfferRequest',
						description: 'Offers agenda',
					},
					{
						name: 'Výroba',
						value: 'lst:listVyrobaRequest',
						description: 'Production agenda',
					},
					{
						name: 'Interní doklady',
						value: 'lst:listIntDocRequest',
						description: 'Internal documents agenda',
					},
					{
						name: 'Poptávky',
						value: 'lst:listEnquiryRequest',
						description: 'Enquiries agenda',
					},
					{
						name: 'Převod',
						value: 'lst:listPrevodkaRequest',
						description: 'Transfers agenda',
					},
					{
						name: 'Banka',
						value: 'lst:listBankRequest',
						description: 'Bank agenda',
					},
					{
						name: 'Zakázky',
						value: 'lst:listContractRequest',
						description: 'Contracts agenda',
					},
					{
						name: 'Pohyby',
						value: 'lst:listMovementRequest',
						description: 'Movements agenda',
					},
					{
						name: 'Účetní deník (PÚ)',
						value: 'lst:listAccountancyRequest',
						description: 'Accounting journal (PÚ) agenda',
					},
					{
						name: 'Adresy',
						value: 'lAdb:listAddressBookRequest',
						description: 'Addresses agenda',
					},
					{
						name: 'Zásoby',
						value: 'lStk:listStockRequest',
						description: 'Stock agenda',
					},
					{
						name: 'Prodejní ceny',
						value: 'lst:listSellingPriceRequest',
						description: 'Seznam prodejních cen',
					},
				],
				type: 'options',
			},
			{
				displayName: 'Invoice Type',
				name: 'entityDetailType',
				type: 'options',
				default: 'issuedInvoice',
				displayOptions: {
					show: {
						resource: ['lst:listInvoiceRequest'],
						operation: ['export', 'create']
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

			{
				displayName: 'Entity',
				type: 'options',
				default: "adresar",
				noDataExpression: true,
				displayOptions: {
					show: {
						operation: ['print'],
					},
				},
				name: 'resource',
				options: [
					{
						name: 'Adresář',
						value: 'adresar',
						description: 'Seznam kontaktů a adres'
					},
					{
						name: 'Banka',
						value: 'banka',
						description: 'Informace o bankovních účtech a transakcích'
					},
					{

						name: 'Cenové akce',
						value: 'cenove_akce',
						description: 'Akce a slevy na produkty'
					},
					{
						name: 'Cenové skupiny',
						value: 'cenove_skupiny',
						description: 'Skupiny cen produktů'
					},
					{
						name: 'Členění skladu',
						value: 'cleneni_skladu',
						description: 'Organizace a členění skladových položek'
					},
					{

						name: 'Evidenční čísla',
						value: 'evidencni_cisla',
						description: 'Seznam evidenčních čísel pro jednotlivé položky'
					},
					{
						name: 'Interní doklady',
						value: 'interni_doklady',
						description: 'Dokumenty používané uvnitř firmy'
					},
					{
						name: 'Inventura',
						value: 'inventura',
						description: 'Seznam položek při inventarizaci'
					},
					{
						name: 'Inventurní seznamy',
						value: 'inventurni_seznamy',
						description: 'Seznamy pro inventarizaci zboží'
					},
					{
						name: 'Ostatní pohledávky',
						value: 'ostatni_pohledavky',
						description: 'Pohledávky, které nejsou zahrnuty v jiných kategoriích'
					},
					{
						name: 'Ostatní závazky',
						value: 'ostatni_zavazky',
						description: 'Závazky, které nejsou zahrnuty v jiných kategoriích'
					},
					{
						name: 'Pohyby',
						value: 'pohyby',
						description: 'Historie pohybů v účetnictví'
					},
					{
						name: 'Pokladna',
						value: 'pokladna',
						description: 'Informace o pokladních transakcích'
					},
					{
						name: 'Převod',
						value: 'prevod',
						description: 'Převody mezi účty'
					},
					{
						name: 'Přijaté faktury',
						value: 'prijate_faktury',
						description: 'Faktury, které byly přijaty od dodavatelů'
					},
					{
						name: 'Přijaté nabídky',
						value: 'prijate_nabidky',
						description: 'Nabídky od dodavatelů'
					},
					{
						name: 'Přijaté objednávky',
						value: 'prijate_objednavky',
						description: 'Objednávky, které byly přijaty od zákazníků'
					},
					{
						name: 'Přijaté poptávky',
						value: 'prijate_poptavky',
						description: 'Poptávky od zákazníků'
					},
					{
						name: 'Přijaté zálohové faktury',
						value: 'prijate_zalohove_faktury',
						description: 'Zálohové faktury, které byly přijaty'
					},
					{
						name: 'Přijemky',
						value: 'prijemky',
						description: 'Záznamy o přijetí zboží'
					},
					{
						name: 'Prodejky',
						value: 'prodejky',
						description: 'Doklady o prodeji zboží'
					},
					{
						name: 'Prodejní ceny',
						value: 'prodejni_ceny',
						description: 'Ceny, za které se prodává zboží'
					},
					{
						name: 'Reklamace',
						value: 'reklamace',
						description: 'Záznamy o reklamovaných produktech'
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
						name: 'Servis',
						value: 'servis',
						description: 'Údržba a opravy produktů'
					},
					{
						name: 'Sklady',
						value: 'sklady',
						description: 'Informace o skladech a jejich obsahu'
					},
					{
						name: 'Uživatelská agenda',
						value: 'uzivatelska_agenda',
						description: 'Speciální agenda definována uživateli'
					},
					{
						name: 'Vydané faktury',
						value: 'vydane_faktury',
						description: 'Faktury, které byly vydány zákazníkům'
					},
					{
						name: 'Vydané nabídky',
						value: 'vydane_nabidky',
						description: 'Nabídky, které byly vydány zákazníkům'
					},
					{
						name: 'Vydané objednávky',
						value: 'vydane_objednavky',
						description: 'Objednávky, které byly vydány zákazníkům'
					},
					{

						name: 'Vydané poptávky',
						value: 'vydane_poptavky',
						description: 'Poptávky, které byly vydány dodavatelům'
					},
					{
						name: 'Vydané zálohové faktury',
						value: 'vydane_zalohove_faktury',
						description: 'Zálohové faktury, které byly vydány'
					},
					{
						name: 'Výdejky',
						value: 'vydejky',
						description: 'Záznamy o výdeji zboží'
					},
					{
						name: 'Výroba',
						value: 'vyroba',
						description: 'Záznamy o výrobě produktů'
					},
					{
						name: 'Výrobní požadavky',
						value: 'vyrobni_pozadavky',
						description: 'Požadavky na výrobu'
					},
					{
						name: 'Zakázky',
						value: 'zakazky',
						description: 'Záznamy o zakázkách'
					},
					{
						name: 'Zásoby',
						value: 'zasoby',
						description: 'Seznam všech skladových zásob'
					}
				]
			},

			// Filter for listing invoices
			{
				displayName: 'Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['lst:listInvoiceRequest', "lst:listAccountancyRequest",
							"lst:listVoucherRequest",
							"lst:listIntDocRequest",
							"lst:listProdejkaRequest",
							"lst:listBankRequest",
							"lst:listAccountancyRequest",
							"lst:listOfferRequest",
							"lst:listPrijemkaRequest",
							"lst:listVydejkaRequest",
							"lst:listVyrobaRequest"],
						operation: ['export']
					},
				},
				name: 'filter',
				// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'Filter by document ID'
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
						displayName: 'User Custom Filter Name',
						name: 'userFilterName',
						type: 'string',
						default: '',
						description: 'Filter with custom Pohoda filter',
					},
					{
						displayName: 'IČO',
						name: 'ico',
						type: 'string',
						default: '',
						description: 'Filter by company IČO',
					}
				],
				placeholder: 'Add Filter',

				type: 'collection',
			},

			{
				"displayName": "Filter",
				"default": {},
				"placeholder": "Add Filter",
				"type": "collection",
				"displayOptions": {
					"show": {
						"resource": [
							"lAdb:listAddressBookRequest"
						],
						"operation": [
							"export"
						]
					}
				},
				"name": "filter",
				"options": [
					{
						"displayName": "ID",
						"name": "id",
						"type": "string",
						"default": "",
						"description": "Vybere záznam dle zadaného ID."
					},
					{
						"displayName": "Company",
						"name": "companyName",
						"type": "string",
						"default": "",
						"description": "Pole název Firmy"
					},
					{
						"displayName": "Name",
						"name": "name",
						"type": "string",
						"default": "",
						"description": "Pole Jméno osoby"
					},
					{
						"displayName": "IČO",
						"name": "ico",
						"type": "string",
						"default": "",
						"description": "Kontrola duplicity v poli IČ."
					},
					{
						"displayName": "DIČ",
						"name": "dic",
						"type": "string",
						"default": "",
						"description": "Kontrola duplicity v poli DIČ."
					},
					{
						"displayName": "Last Changes",
						"name": "lastChanges",
						"type": "dateTime",
						"default": "",
						"description": "Vyexportuje záznamy změněné od zadaného data."
					}
				]
			},


			{
				"displayName": "Entity Detail",
				"default": {},
				"placeholder": "Add Field",
				"type": "collection",
				"displayOptions": {
					"show": {
						"resource": [
							"lAdb:listAddressBookRequest"
						],
						"operation": [
							"create",
							"update"
						]
					}
				},
				"name": "createEntity",
				"options": [
					{
						"displayName": "Company",
						"name": "company",
						"type": "string",
						"default": "",
						"description": "Název firmy"
					},
					{
						"displayName": "Name",
						"name": "name",
						"type": "string",
						"default": "",
						"description": "Jméno"
					},
					{
						"displayName": "City",
						"name": "city",
						"type": "string",
						"default": "",
						"description": "Město"
					},
					{
						"displayName": "Street",
						"name": "street",
						"type": "string",
						"default": "",
						"description": "Ulice"
					},
					{
						"displayName": "ZIP Code",
						"name": "zip",
						"type": "string",
						"default": "",
						"description": "PSČ"
					},
					{
						"displayName": "IČO",
						"name": "ico",
						"type": "string",
						"default": "",
						"description": "Company Registration ID - IČO"
					},
					{
						"displayName": "DIČ",
						"name": "dic",
						"type": "string",
						"default": "",
						"description": "DIČ"
					},
					{
						"displayName": "Phone",
						"name": "phone",
						"type": "string",
						"default": "",
						"description": "Telefon"
					},
					{
						"displayName": "Mobile",
						"name": "mobil",
						"type": "string",
						"default": "",
						"description": "Mobil"
					},
					{
						"displayName": "Email",
						"name": "email",
						"type": "string",
						"default": "",
						"description": "Email"
					},
					{
						"displayName": "Website",
						"name": "web",
						"type": "string",
						"default": "",
						"description": "Webová stránka"
					},
					{
						"displayName": "Message",
						"name": "message",
						"type": "string",
						"default": "",
						"description": "Zpráva"
					},
					{
						"displayName": "Note",
						"name": "note",
						"type": "string",
						"default": "",
						"description": "Poznámka"
					},
					{
						"displayName": "Internal Note",
						"name": "intNote",
						"type": "string",
						"default": "",
						"description": "Interní poznámka"
					}
				]
			},

			{
				// eslint-disable-next-line
				displayName: 'ID záznamu',
				name: 'recordId',
				type: 'number',
				default: null,
				displayOptions: {
					show: {
						operation: ['print'],
					},
				},
				description: 'Item Row ID',
			},

			{
				// eslint-disable-next-line
				displayName: 'ID sestavy',
				name: 'reportId',
				type: 'number',
				default: null,
				displayOptions: {
					show: {
						operation: ['print'],
					},
				},
				description: 'Identifikátor sestavy. Hodnotu naleznete ve vlastnostech sestavy.',
			},

			{
				// eslint-disable-next-line
				displayName: 'Název/cesta k souboru',
				name: 'fileName',
				type: 'string',
				default: "n8n.pdf",
				displayOptions: {
					show: {
						operation: ['print'],
					},
				},
				description: 'Cesta k souboru a název kam bude uložen',
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
				name: 'invoiceHeader',
				// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
				options: [
					{
						displayName: 'Invoice Type',
						name: 'entityDetailType',
						displayOptions: {
							show: {
								operation: ['export'],
								resource: [
									"lst:listInvoiceRequest"
								]
							}
						},
						type: 'options',
						// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
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
						default: ''
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
				placeholder: 'Add Field',
				type: 'collection',
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
				displayName: 'UTF8 Conversion',
				name: 'utfConvert',
				type: 'boolean',
				default: true
			},
			{
				displayName: 'Delete File After Print',
				name: 'deleteFile',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						operation: [
							"print"
						],
					},
				},
			},
		],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		usableAsTool: true,
		version: 1,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let scope = this;
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('pohodaAuthApi');

		async function processXmlRequest(xmlRequest: string, itemIndex: number) {
			const credentials = await scope.getCredentials('pohodaAuthApi');
			const xmlOutputFormat = scope.getNodeParameter('xmlOutput', itemIndex) as boolean;
			const utfConvert = scope.getNodeParameter('utfConvert', itemIndex) as boolean;

			const pohodaUrl = `${credentials.baseUrl}/xml`;
			console.log(`Request to ${pohodaUrl}`, xmlRequest);
			// curl -d @req.xml -X POST -H "STW-Authorization: Basic QDo=" -H "Content-Type: application/xml" http://10.0.111.111:3880/xml
			const respBuffer = await scope.helpers.httpRequest({
				method: 'POST',
				encoding: 'arraybuffer',
				url: pohodaUrl,
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
				throw new NodeApiError(scope.getNode(), {
					// fix, url decode @note
					message: respPack['@note'],
				});
			}

			const respPackItem = respPack['rsp:responsePackItem'] as any;
			if (respPackItem['@state'] != "ok") {
				throw new NodeApiError(scope.getNode(), {
					message: respPackItem['@note'],
				});
			}

			if (xmlOutputFormat)
				returnData.push({
					json: {data: xmlStr},
					pairedItem: itemIndex,
				});
			else if (respPackItem['prn:printResponse'] && respPackItem['prn:printResponse']['rdc:printDetails']) {
				let binary = respPackItem['prn:printResponse']['rdc:printDetails']['rdc:attachments']['rdc:attachment']['rdc:data']['#'];
				let fileName = respPackItem['prn:printResponse']['rdc:printDetails']['rdc:attachments']['rdc:attachment']['rdc:data']['@fileName'];
				delete respPackItem['prn:printResponse']['rdc:printDetails']['rdc:attachments']['rdc:attachment']['rdc:data'];
				returnData.push({
					json: respPackItem['prn:printResponse']['rdc:printDetails'],
					binary: {
						"data": {
							data: binary,
							mimeType: "application/pdf",
							fileExtension: 'pdf',
							fileName: fileName
						}
					},
					pairedItem: itemIndex,
				});
			} else {
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
		}

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				if (operation === 'export') {
					const actionEntity = this.getNodeParameter('resource', itemIndex) as string;
					const filter = this.getNodeParameter('filter', itemIndex, {}) as ListInvoicesFilter;

					const limit = {
						count: this.getNodeParameter('count', itemIndex, 10) as number,
						idFrom: this.getNodeParameter('idFrom', itemIndex, 0) as number
					} as ListLimit;

					// Ensure dateFrom and dateTill are in the correct format (YYYY-MM-DD)
					if (filter.dateFrom) {
						filter.dateFrom = new Date(filter.dateFrom).toISOString().split('T')[0];
					}
					if (filter.dateTill) {
						filter.dateTill = new Date(filter.dateTill).toISOString().split('T')[0];
					}

					let xmlRequest;
					if (actionEntity === 'lst:listInvoiceRequest') {
						const entityDetailType = this.getNodeParameter('entityDetailType', itemIndex) as string;
						const listAttrs = {
							version: '2.0',
							invoiceType: entityDetailType,
							invoiceVersion: '2.0',
							request: 'lst:requestInvoice'
						};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listBankRequest') {
						const listAttrs = {version: '2.0', bankVersion: '2.0', request: 'lst:requestBank'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listAccountancyRequest') {
						const listAttrs = {version: '2.0', accountancyVersion: '2.0', request: 'lst:requestAccountancy'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listIntDocRequest') {
						const listAttrs = {version: '2.0', intDocVersion: '2.0', request: 'lst:requestIntDoc'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listVoucherRequest') {
						const listAttrs = {version: '2.0', voucherVersion: '2.0', request: 'lst:requestVoucher'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listProdejkaRequest') {
						const listAttrs = {version: '2.0', prodejkaVersion: '2.0', request: 'lst:requestProdejka'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listPrevodkaRequest') {
						const listAttrs = {version: '2.0', prevodkaVersion: '2.0', request: 'lst:requestPrevodka'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listVyrobaRequest') {
						const listAttrs = {version: '2.0', vyrobaVersion: '2.0', request: 'lst:requestVyroba'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listVydejkaRequest') {
						const listAttrs = {version: '2.0', vydejkaVersion: '2.0', request: 'lst:requestVydejka'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listPrijemkaRequest') {
						const listAttrs = {version: '2.0', prijemkaVersion: '2.0', request: 'lst:requestPrijemka'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listEnquiryRequest') {
						const listAttrs = {version: '2.0', enquiryVersion: '2.0', request: 'lst:requestEnquiry'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listOfferRequest') {
						const listAttrs = {version: '2.0', offerVersion: '2.0', request: 'lst:requestOffer'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lAdb:listAddressBookRequest') {
						const listAttrs = {version: '2.0', addressBookVersion: '2.0', request: 'lAdb:requestAddressBook'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lStk:listStockRequest') {
						const listAttrs = {version: '2.0', stockVersion: '2.0', request: 'lStk:requestStock'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listOrderRequest') {
						// TODO missing selector for order type
						const listAttrs = {
							version: '2.0',
							orderVersion: '2.0',
							orderType: "issuedOrder",
							request: 'lst:requestOrder'
						};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listMovementRequest') {
						const listAttrs = {version: '2.0', movementVersion: '2.0', request: 'lst:requestMovement'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter, limit);
					} else if (actionEntity === 'lst:listSellingPriceRequest') {
						const listAttrs = {version: '1.0'};
						xmlRequest = generateListRequest(credentials.ico as string, actionEntity, listAttrs, filter);
					} else {
						throw new NodeApiError(this.getNode(), {
							message: `Not implemented for ${actionEntity}`
						});
					}

					await processXmlRequest(xmlRequest, itemIndex);

				} else if (operation === 'create') {
					const actionEntity = this.getNodeParameter('resource', itemIndex) as string;
					const createEntity = this.getNodeParameter('createEntity', itemIndex) as any;
					console.log('createEntity', createEntity);
					let xmlRequest;
					if (actionEntity === 'lAdb:listAddressBookRequest') {
						xmlRequest = generateCreateRequest(credentials.ico as string, 'adb:addressbook', createEntity);
					} else {
						throw new NodeApiError(this.getNode(), {
							message: `Not implemented for ${actionEntity}`
						});
					}
					await processXmlRequest(xmlRequest, itemIndex);
				} else if (operation === 'company-info') {
					const xmlOutputFormat = scope.getNodeParameter('xmlOutput', itemIndex) as boolean;
					const utfConvert = scope.getNodeParameter('utfConvert', itemIndex) as boolean;
					const pohodaUrl = `${credentials.baseUrl}/status?companyDetail`;
					// curl -d @req.xml -X POST -H "STW-Authorization: Basic QDo=" -H "Content-Type: application/xml" http://10.0.111.111:3880/status?companyDetail
					const respBuffer = await this.helpers.httpRequest({
						method: 'GET',
						encoding: 'arraybuffer',
						url: pohodaUrl,
						headers: {
							'Content-Type': 'application/xml',
							'STW-Application': 'N8N Pohoda Node',
							'STW-Authorization': `Basic ${Buffer.from(
								`${credentials.username}:${credentials.password}`,
							).toString('base64')}`,
						}
					});

					const xmlStr = utfConvert ? iconv.decode(respBuffer, "win1250").replace(`encoding="Windows-1250"`, `encoding="utf-8"`) : respBuffer.toString();
					const jsonResponse = convert(xmlStr.replace("\ufeff", ""), {format: "object"}) as any;
					if (xmlOutputFormat)
						returnData.push({
							json: {data: xmlStr},
							pairedItem: itemIndex,
						});
					else
						returnData.push({
							json: jsonResponse.mServer,
							pairedItem: itemIndex,
						});
				} else if (operation === 'print') {
					const agenda = this.getNodeParameter('resource', itemIndex) as string;
					const recordId = this.getNodeParameter('recordId', itemIndex) as string;
					const reportId = this.getNodeParameter('reportId', itemIndex) as string;
					const fileName = this.getNodeParameter('fileName', itemIndex) as string;
					const deleteFile = scope.getNodeParameter('deleteFile', itemIndex) as boolean;

					let xmlRequest = generatePrintRequest(credentials.ico as string, agenda, reportId, recordId, fileName, deleteFile);
					// curl -d @req.xml -X POST -H "STW-Authorization: Basic QDo=" -H "Content-Type: application/xml" http://10.0.111.111:3880/xml

					await processXmlRequest(xmlRequest, itemIndex);
				} else {
					// Import
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
		if (key.includes(':')) {
			let subObj = obj[key];
			for (const key2 in subObj) {
				if (key2.includes(':')) {
					if (key2 === 'lst:accountancy') { // Hack
						return subObj[key2]['act:accountingItem'];
					}
					if (Array.isArray(subObj[key2])) {
						return subObj[key2];
					}
					return subObj[key2];
				}
			}
		}
	}
}
