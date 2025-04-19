import { INodeProperties } from 'n8n-workflow';

export const vyrobaOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['vyroba'] } },
    options: [
      { name: 'Vyroba', value: 'vyroba', action: 'Vyroba' },
    ], default: 'vyroba' },
];

export const vyrobaFields: INodeProperties[] = [
  // TODO: add fields for vyroba operations
];
