import { INodeProperties } from 'n8n-workflow';

export const inventoryListsOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['inventoryLists'] } },
    options: [
      { name: 'Inventory Lists', value: 'inventoryLists', action: 'Inventory Lists' },
    ], default: 'inventoryLists' },
];

export const inventoryListsFields: INodeProperties[] = [
  // TODO: add fields for inventoryLists operations
];
