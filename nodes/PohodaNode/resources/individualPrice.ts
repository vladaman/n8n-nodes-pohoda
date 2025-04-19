import { INodeProperties } from 'n8n-workflow';

export const individualPriceOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['individualPrice'] } },
    options: [
      { name: 'Individual Price', value: 'individualPrice', action: 'Individual Price' },
    ], default: 'individualPrice' },
];

export const individualPriceFields: INodeProperties[] = [
  // TODO: add fields for individualPrice operations
];
