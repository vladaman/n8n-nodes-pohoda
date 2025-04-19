import { INodeProperties } from 'n8n-workflow';

export const bankOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['bank'] } },
    options: [
      { name: 'Bank', value: 'bank', action: 'Bank' },
    ], default: 'bank' },
];

export const bankFields: INodeProperties[] = [
  // TODO: add fields for bank operations
];
