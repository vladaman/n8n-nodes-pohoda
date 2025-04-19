import { INodeProperties } from 'n8n-workflow';

export const intParamOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['intParam'] } },
    options: [
      { name: 'Int Param Detail', value: 'intParamDetail', action: 'Int Param Detail' },
    ], default: 'intParamDetail' },
];

export const intParamFields: INodeProperties[] = [
  // TODO: add fields for intParam operations
];
