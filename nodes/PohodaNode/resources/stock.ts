import { INodeProperties } from 'n8n-workflow';

export const stockOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['stock'] } },
    options: [
      { name: 'Stock', value: 'stock', action: 'Stock' },
    ], default: 'stock' },
];

export const stockFields: INodeProperties[] = [
  // TODO: add fields for stock operations
];
