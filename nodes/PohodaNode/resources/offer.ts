import { INodeProperties } from 'n8n-workflow';

export const offerOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['offer'] } },
    options: [
      { name: 'Offer', value: 'offer', action: 'Offer' },
    ], default: 'offer' },
];

export const offerFields: INodeProperties[] = [
  // TODO: add fields for offer operations
];
