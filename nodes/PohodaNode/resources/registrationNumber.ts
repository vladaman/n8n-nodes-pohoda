import { INodeProperties } from 'n8n-workflow';

export const registrationNumberOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['registrationNumber'] } },
    options: [
      { name: 'Registration Number', value: 'registrationNumber', action: 'Registration Number' },
    ], default: 'registrationNumber' },
];

export const registrationNumberFields: INodeProperties[] = [
  // TODO: add fields for registrationNumber operations
];
