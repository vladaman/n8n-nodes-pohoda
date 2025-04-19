import { INodeProperties } from 'n8n-workflow';

export const accountingFormOfPaymentOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['accountingFormOfPayment'] } },
    options: [
      { name: 'Accounting Form Of Payment', value: 'accountingFormOfPayment', action: 'Accounting Form Of Payment' },
    ], default: 'accountingFormOfPayment' },
];

export const accountingFormOfPaymentFields: INodeProperties[] = [
  // TODO: add fields for accountingFormOfPayment operations
];
