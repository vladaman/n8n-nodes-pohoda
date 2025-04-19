import { INodeProperties } from 'n8n-workflow';

export const activityOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['activity'] } },
    options: [
      { name: 'Activity', value: 'activity', action: 'Activity' },
    ], default: 'activity' },
];

export const activityFields: INodeProperties[] = [
  // TODO: add fields for activity operations
];
