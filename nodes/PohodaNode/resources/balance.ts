import { INodeProperties } from 'n8n-workflow';

export const balanceOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['balance'] } },
    options: [
      { name: 'Balance', value: 'balance', action: 'Balance' },
    ], default: 'balance' },
];

export const balanceFields: INodeProperties[] = [
  // TODO: add fields for balance operations
];
