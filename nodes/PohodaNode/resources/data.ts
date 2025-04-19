import { INodeProperties } from 'n8n-workflow';

export const dataOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['data'] } },
    options: [
      { name: 'Data Pack', value: 'dataPack', action: 'Data Pack' },
    ], default: 'dataPack' },
];

export const dataFields: INodeProperties[] = [
  // TODO: add fields for data operations
];
