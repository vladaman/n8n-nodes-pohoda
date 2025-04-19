import { INodeProperties } from 'n8n-workflow';

export const groupStocksOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['groupStocks'] } },
    options: [
      { name: 'Group Stocks', value: 'groupStocks', action: 'Group Stocks' },
    ], default: 'groupStocks' },
];

export const groupStocksFields: INodeProperties[] = [
  // TODO: add fields for groupStocks operations
];
