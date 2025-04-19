import { INodeProperties } from 'n8n-workflow';

export const prodejkaOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['prodejka'] } },
    options: [
      { name: 'Prodejka', value: 'prodejka', action: 'Prodejka' },
    ], default: 'prodejka' },
];

export const prodejkaFields: INodeProperties[] = [
  // TODO: add fields for prodejka operations
];
