import { INodeProperties } from 'n8n-workflow';

export const storeOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['store'] } },
    options: [
      { name: 'Store', value: 'store', action: 'Store' },
    ], default: 'store' },
];

export const storeFields: INodeProperties[] = [
  // TODO: add fields for store operations
];
