import { INodeProperties } from 'n8n-workflow';

export const prevodkaOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['prevodka'] } },
    options: [
      { name: 'Prevodka', value: 'prevodka', action: 'Prevodka' },
    ], default: 'prevodka' },
];

export const prevodkaFields: INodeProperties[] = [
  // TODO: add fields for prevodka operations
];
