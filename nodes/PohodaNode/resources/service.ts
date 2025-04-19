import { INodeProperties } from 'n8n-workflow';

export const serviceOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['service'] } },
    options: [
      { name: 'Service', value: 'service', action: 'Service' },
    ], default: 'service' },
];

export const serviceFields: INodeProperties[] = [
  // TODO: add fields for service operations
];
