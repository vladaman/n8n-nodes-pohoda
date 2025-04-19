import { INodeProperties } from 'n8n-workflow';

export const mKasaOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['mKasa'] } },
    options: [
      { name: 'M Kasa', value: 'mKasa', action: 'M Kasa' },
    ], default: 'mKasa' },
];

export const mKasaFields: INodeProperties[] = [
  // TODO: add fields for mKasa operations
];
