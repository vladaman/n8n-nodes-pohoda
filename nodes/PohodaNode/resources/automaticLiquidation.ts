import { INodeProperties } from 'n8n-workflow';

export const automaticLiquidationOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['automaticLiquidation'] } },
    options: [
      { name: 'Automatic Liquidation', value: 'automaticLiquidation', action: 'Automatic Liquidation' },
    ], default: 'automaticLiquidation' },
];

export const automaticLiquidationFields: INodeProperties[] = [
  // TODO: add fields for automaticLiquidation operations
];
