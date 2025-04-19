import { INodeProperties } from 'n8n-workflow';

export const prijemkaOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['prijemka'] } },
    options: [
      { name: 'Prijemka', value: 'prijemka', action: 'Prijemka' },
    ], default: 'prijemka' },
];

export const prijemkaFields: INodeProperties[] = [
  // TODO: add fields for prijemka operations
];
