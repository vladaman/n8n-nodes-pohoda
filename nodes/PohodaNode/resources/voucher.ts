import { INodeProperties } from 'n8n-workflow';

export const voucherOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['voucher'] } },
    options: [
      { name: 'Voucher', value: 'voucher', action: 'Voucher' },
    ], default: 'voucher' },
];

export const voucherFields: INodeProperties[] = [
  // TODO: add fields for voucher operations
];
