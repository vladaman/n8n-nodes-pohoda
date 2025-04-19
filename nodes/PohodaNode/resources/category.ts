import { INodeProperties } from 'n8n-workflow';

export const categoryOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['category'] } },
    options: [
      { name: 'Category Detail', value: 'categoryDetail', action: 'Category Detail' },
    ], default: 'categoryDetail' },
];

export const categoryFields: INodeProperties[] = [
  // TODO: add fields for category operations
];
