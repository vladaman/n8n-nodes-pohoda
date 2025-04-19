import { INodeProperties } from 'n8n-workflow';

export const recyclingContribOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['recyclingContrib'] } },
    options: [
      { name: 'Recycling Contrib', value: 'recyclingContrib', action: 'Recycling Contrib' },
    ], default: 'recyclingContrib' },
];

export const recyclingContribFields: INodeProperties[] = [
  // TODO: add fields for recyclingContrib operations
];
