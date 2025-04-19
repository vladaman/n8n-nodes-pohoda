import { INodeProperties } from 'n8n-workflow';

export const invoiceOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['invoice'] } },
    options: [
      { name: 'Invoice', value: 'invoice', action: 'Invoice' },
    ], default: 'invoice' },
];

export const invoiceFields: INodeProperties[] = [
  {
    displayName: 'Invoice Header',
    name: 'invoiceHeader',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['invoice'],
      },
    },
    options: [
      { displayName: 'ID', name: 'id', type: 'string', default: '', description: 'Record ID (export only)' },
      { displayName: 'External ID', name: 'extId', type: 'string', default: '', description: 'External reference ID' },
      {
        displayName: 'Invoice Type',
        name: 'invoiceType',
        type: 'options',
        options: [
          { name: 'Issued Invoice', value: 'issuedInvoice' },
          { name: 'Issued Credit Notice', value: 'issuedCreditNotice' },
          { name: 'Issued Debit Note', value: 'issuedDebitNote' },
          { name: 'Issued Advance Invoice', value: 'issuedAdvanceInvoice' },
          { name: 'Issued Proforma Invoice', value: 'issuedProformaInvoice' },
        ],
        default: 'issuedInvoice',
        description: 'Type of the invoice',
      },
      { displayName: 'Number', name: 'number', type: 'string', default: '', description: 'Document number' },
      { displayName: 'Variable Symbol', name: 'symVar', type: 'string', default: '', description: 'Variable symbol' },
      { displayName: 'Original Document', name: 'originalDocument', type: 'string', default: '', description: 'Original document number' },
      { displayName: 'Original Document Number', name: 'originalDocumentNumber', type: 'string', default: '', description: 'Original document number for credit/debit notes' },
      { displayName: 'Date', name: 'date', type: 'dateTime', default: '', description: 'Date of the invoice' },
      { displayName: 'Tax Date', name: 'dateTax', type: 'dateTime', default: '', description: 'Tax date (date of taxable supply)' },
      { displayName: 'Accounting Date', name: 'dateAccounting', type: 'dateTime', default: '', description: 'Accounting date' },
      { displayName: 'Due Date', name: 'dateDue', type: 'dateTime', default: '', description: 'Due date' },
      { displayName: 'Text', name: 'text', type: 'string', default: '', description: 'Additional text' },
    ],
  },
  {
    displayName: 'Invoice Items',
    name: 'invoiceItems',
    type: 'fixedCollection',
    typeOptions: { multipleValues: true },
    placeholder: 'Add Item',
    default: [],
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['invoice'],
      },
    },
    options: [
      {
        displayName: 'Item',
        name: 'item',
        values: [
          { displayName: 'Text', name: 'text', type: 'string', default: '', description: 'Item description' },
          { displayName: 'Quantity', name: 'quantity', type: 'number', default: 1, description: 'Quantity' },
          { displayName: 'Unit', name: 'unit', type: 'string', default: '', description: 'Unit of measure' },
          { displayName: 'Coefficient', name: 'coefficient', type: 'number', default: 1, description: 'Coefficient (export only)' },
          { displayName: 'Pay VAT', name: 'payVAT', type: 'boolean', default: false, description: 'Prices include VAT' },
          {
            displayName: 'VAT Rate',
            name: 'rateVAT',
            type: 'options',
            options: [
              { name: 'None', value: 'none' },
              { name: '0%', value: 0 },
              { name: '10%', value: 10 },
              { name: '15%', value: 15 },
              { name: '21%', value: 21 },
            ],
            default: 'none',
            description: 'VAT rate for the item',
          },
          { displayName: 'Percent VAT', name: 'percentVAT', type: 'number', default: 0, description: 'Historic VAT rate in percent' },
        ],
      },
    ],
  },
];
