import { INodeProperties } from 'n8n-workflow';

export const accountingunitOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['accountingunit'] } },
    options: [
      { name: 'List Accounting Unit', value: 'listAccountingUnit', action: 'List Accounting Unit' },
    ], default: 'listAccountingUnit' },
];

export const accountingunitFields: INodeProperties[] = [
  // TODO: add fields for accountingunit operations
];
