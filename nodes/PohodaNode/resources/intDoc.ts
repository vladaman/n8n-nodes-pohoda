import { INodeProperties } from 'n8n-workflow';

export const intDocOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['intDoc'] } },
    options: [
      { name: 'Int Doc', value: 'intDoc', action: 'Int Doc' },
    ], default: 'intDoc' },
];

export const intDocFields: INodeProperties[] = [
  // TODO: add fields for intDoc operations
];
