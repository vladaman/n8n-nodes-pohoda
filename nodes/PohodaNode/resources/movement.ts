import { INodeProperties } from 'n8n-workflow';

export const movementOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['movement'] } },
    options: [
      { name: 'Movement', value: 'movement', action: 'Movement' },
    ], default: 'movement' },
];

export const movementFields: INodeProperties[] = [
  // TODO: add fields for movement operations
];
