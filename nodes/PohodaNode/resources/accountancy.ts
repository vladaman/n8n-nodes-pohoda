import { INodeProperties } from 'n8n-workflow';

export const accountancyOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['accountancy'] } },
    options: [
      { name: 'Accountancy', value: 'accountancy', action: 'Accountancy' },
    ], default: 'accountancy' },
];

export const accountancyFields: INodeProperties[] = [
  // TODO: add fields for accountancy operations
];
