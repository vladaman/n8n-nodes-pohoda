import { INodeProperties } from 'n8n-workflow';

export const cashRegisterOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['cashRegister'] } },
    options: [
      { name: 'Cash Register', value: 'cashRegister', action: 'Cash Register' },
    ], default: 'cashRegister' },
];

export const cashRegisterFields: INodeProperties[] = [
  // TODO: add fields for cashRegister operations
];
