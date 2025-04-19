import { INodeProperties } from 'n8n-workflow';

export const gDPROperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['gDPR'] } },
    options: [
      { name: 'G D P R', value: 'gDPR', action: 'G D P R' },
    ], default: 'gDPR' },
];

export const gDPRFields: INodeProperties[] = [
  // TODO: add fields for gDPR operations
];
