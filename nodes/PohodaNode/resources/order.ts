import { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['order'] } },
    options: [
      { name: 'Order', value: 'order', action: 'Order' },
    ], default: 'order' },
];

export const orderFields: INodeProperties[] = [
  // TODO: add fields for order operations
];
