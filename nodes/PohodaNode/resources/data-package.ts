import { INodeProperties } from 'n8n-workflow';

export const dataPackageOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['data-package'] } },
    options: [
      { name: 'Data Pack', value: 'dataPack', action: 'Data Pack' },
    ], default: 'dataPack' },
];

export const dataPackageFields: INodeProperties[] = [
  // TODO: add fields for data-package operations
];
