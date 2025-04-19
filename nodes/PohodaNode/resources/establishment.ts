import { INodeProperties } from 'n8n-workflow';

export const establishmentOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['establishment'] } },
    options: [
      { name: 'Establishment', value: 'establishment', action: 'Establishment' },
    ], default: 'establishment' },
];

export const establishmentFields: INodeProperties[] = [
  // TODO: add fields for establishment operations
];
