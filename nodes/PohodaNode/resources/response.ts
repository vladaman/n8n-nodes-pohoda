import { INodeProperties } from 'n8n-workflow';

export const responseOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['response'] } },
    options: [
      { name: 'Response Pack', value: 'responsePack', action: 'Response Pack' },
    ], default: 'responsePack' },
];

export const responseFields: INodeProperties[] = [
  // TODO: add fields for response operations
];
