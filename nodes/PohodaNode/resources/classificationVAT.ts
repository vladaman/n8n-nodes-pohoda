import { INodeProperties } from 'n8n-workflow';

export const classificationVATOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['classificationVAT'] } },
    options: [
      { name: 'Classification V A T', value: 'classificationVAT', action: 'Classification V A T' },
    ], default: 'classificationVAT' },
];

export const classificationVATFields: INodeProperties[] = [
  // TODO: add fields for classificationVAT operations
];
