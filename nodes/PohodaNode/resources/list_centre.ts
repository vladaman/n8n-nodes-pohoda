import { INodeProperties } from 'n8n-workflow';

export const list_centreOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['list_centre'] } },
    options: [
      { name: 'List Centre', value: 'listCentre', action: 'List Centre' },
    ], default: 'listCentre' },
];

export const list_centreFields: INodeProperties[] = [
  // TODO: add fields for list_centre operations
];
