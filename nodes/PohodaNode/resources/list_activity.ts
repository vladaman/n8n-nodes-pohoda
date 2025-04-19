import { INodeProperties } from 'n8n-workflow';

export const list_activityOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['list_activity'] } },
    options: [
      { name: 'List Activity', value: 'listActivity', action: 'List Activity' },
    ], default: 'listActivity' },
];

export const list_activityFields: INodeProperties[] = [
  // TODO: add fields for list_activity operations
];
