import { INodeProperties } from 'n8n-workflow';

export const rulesPairingOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['rulesPairing'] } },
    options: [
      { name: 'Rules Pairing', value: 'rulesPairing', action: 'Rules Pairing' },
    ], default: 'rulesPairing' },
];

export const rulesPairingFields: INodeProperties[] = [
  // TODO: add fields for rulesPairing operations
];
