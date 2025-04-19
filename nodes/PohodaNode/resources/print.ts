import { INodeProperties } from 'n8n-workflow';

export const printOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['print'] } },
    options: [
      { name: 'Print', value: 'print', action: 'Print' },
    ], default: 'print' },
];

export const printFields: INodeProperties[] = [
  // TODO: add fields for print operations
];
