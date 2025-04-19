import { INodeProperties } from 'n8n-workflow';

export const list_contractOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['list_contract'] } },
    options: [
      { name: 'List Contract', value: 'listContract', action: 'List Contract' },
    ], default: 'listContract' },
];

export const list_contractFields: INodeProperties[] = [
  // TODO: add fields for list_contract operations
];
