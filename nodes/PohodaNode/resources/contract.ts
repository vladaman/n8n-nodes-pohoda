import { INodeProperties } from 'n8n-workflow';

export const contractOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['contract'] } },
    options: [
      { name: 'Contract', value: 'contract', action: 'Contract' },
    ], default: 'contract' },
];

export const contractFields: INodeProperties[] = [
  // TODO: add fields for contract operations
];
