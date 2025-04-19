import { INodeProperties } from 'n8n-workflow';

export const liquidationWithoutLinkOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['liquidationWithoutLink'] } },
    options: [
      { name: 'Liquidation Without Link', value: 'liquidationWithoutLink', action: 'Liquidation Without Link' },
    ], default: 'liquidationWithoutLink' },
];

export const liquidationWithoutLinkFields: INodeProperties[] = [
  // TODO: add fields for liquidationWithoutLink operations
];
