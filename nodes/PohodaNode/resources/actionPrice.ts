import { INodeProperties } from 'n8n-workflow';

export const actionPriceOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['actionPrice'] } },
    options: [
      { name: 'Action Price', value: 'actionPrice', action: 'Action Price' },
    ], default: 'actionPrice' },
];

export const actionPriceFields: INodeProperties[] = [
  // TODO: add fields for actionPrice operations
];
