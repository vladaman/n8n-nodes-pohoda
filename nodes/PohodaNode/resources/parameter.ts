import { INodeProperties } from 'n8n-workflow';

export const parameterOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['parameter'] } },
    options: [
      { name: 'Parameter', value: 'parameter', action: 'Parameter' },
    ], default: 'parameter' },
];

export const parameterFields: INodeProperties[] = [
  // TODO: add fields for parameter operations
];
