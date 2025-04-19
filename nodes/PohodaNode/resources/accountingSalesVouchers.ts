import { INodeProperties } from 'n8n-workflow';

export const accountingSalesVouchersOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['accountingSalesVouchers'] } },
    options: [
      { name: 'Accounting Sales Vouchers', value: 'accountingSalesVouchers', action: 'Accounting Sales Vouchers' },
    ], default: 'accountingSalesVouchers' },
];

export const accountingSalesVouchersFields: INodeProperties[] = [
  // TODO: add fields for accountingSalesVouchers operations
];
