import { INodeProperties } from 'n8n-workflow';

export const advancePartFulfilmentOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['advancePartFulfilment'] } },
    options: [
      { name: 'Advance Part Fulfilment', value: 'advancePartFulfilment', action: 'Advance Part Fulfilment' },
    ], default: 'advancePartFulfilment' },
];

export const advancePartFulfilmentFields: INodeProperties[] = [
  // TODO: add fields for advancePartFulfilment operations
];
