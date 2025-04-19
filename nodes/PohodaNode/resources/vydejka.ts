import { INodeProperties } from 'n8n-workflow';

export const vydejkaOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['vydejka'] } },
    options: [
      { name: 'Vydejka', value: 'vydejka', action: 'Vydejka' },
    ], default: 'vydejka' },
];

export const vydejkaFields: INodeProperties[] = [
  // TODO: add fields for vydejka operations
];
