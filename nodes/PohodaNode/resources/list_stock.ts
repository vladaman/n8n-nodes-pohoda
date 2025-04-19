import { INodeProperties } from 'n8n-workflow';

export const list_stockOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['list_stock'] } },
    options: [
      { name: 'List Stock', value: 'listStock', action: 'List Stock' },
    ], default: 'listStock' },
];

export const list_stockFields: INodeProperties[] = [
  // TODO: add fields for list_stock operations
];
