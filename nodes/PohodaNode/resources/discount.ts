import { INodeProperties } from 'n8n-workflow';

export const discountOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['discount'] } },
    options: [
      { name: 'Discount', value: 'discount', action: 'Discount' },
    ], default: 'discount' },
];

export const discountFields: INodeProperties[] = [
  // TODO: add fields for discount operations
];
