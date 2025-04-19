import { INodeProperties } from 'n8n-workflow';

export const storageOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['storage'] } },
    options: [
      { name: 'Storage', value: 'storage', action: 'Storage' },
    ], default: 'storage' },
];

export const storageFields: INodeProperties[] = [
  // TODO: add fields for storage operations
];
