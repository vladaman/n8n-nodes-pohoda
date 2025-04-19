import { INodeProperties } from 'n8n-workflow';

export const centreOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['centre'] } },
    options: [
      { name: 'Centre', value: 'centre', action: 'Centre' },
    ], default: 'centre' },
];

export const centreFields: INodeProperties[] = [
  // TODO: add fields for centre operations
];
