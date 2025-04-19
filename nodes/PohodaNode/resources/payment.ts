import { INodeProperties } from 'n8n-workflow';

export const paymentOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['payment'] } },
    options: [
      { name: 'Payment', value: 'payment', action: 'Payment' },
    ], default: 'payment' },
];

export const paymentFields: INodeProperties[] = [
  // TODO: add fields for payment operations
];
