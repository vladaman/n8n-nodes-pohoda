import { INodeProperties } from 'n8n-workflow';

export const isdocOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['isdoc'] } },
    options: [
      { name: 'Isdoc', value: 'isdoc', action: 'Isdoc' },
    ], default: 'isdoc' },
];

export const isdocFields: INodeProperties[] = [
  // TODO: add fields for isdoc operations
];
