import { INodeProperties } from 'n8n-workflow';

export const bankAccountOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['bankAccount'] } },
    options: [
      { name: 'Bank Account', value: 'bankAccount', action: 'Bank Account' },
    ], default: 'bankAccount' },
];

export const bankAccountFields: INodeProperties[] = [
  // TODO: add fields for bankAccount operations
];
