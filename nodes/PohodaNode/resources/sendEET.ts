import { INodeProperties } from 'n8n-workflow';

export const sendEETOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['sendEET'] } },
    options: [
      { name: 'Send E E T', value: 'sendEET', action: 'Send E E T' },
    ], default: 'sendEET' },
];

export const sendEETFields: INodeProperties[] = [
  // TODO: add fields for sendEET operations
];
