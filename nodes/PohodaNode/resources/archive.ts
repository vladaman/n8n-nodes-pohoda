import { INodeProperties } from 'n8n-workflow';

export const archiveOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['archive'] } },
    options: [
      { name: 'Archive', value: 'archive', action: 'Archive' },
    ], default: 'archive' },
];

export const archiveFields: INodeProperties[] = [
  // TODO: add fields for archive operations
];
