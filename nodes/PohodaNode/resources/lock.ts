import { INodeProperties } from 'n8n-workflow';

export const lockOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['lock'] } },
    options: [
      { name: 'Lock', value: 'lock', action: 'Lock' },
    ], default: 'lock' },
];

export const lockFields: INodeProperties[] = [
  // TODO: add fields for lock operations
];
