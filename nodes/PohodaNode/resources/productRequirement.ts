import { INodeProperties } from 'n8n-workflow';

export const productRequirementOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['productRequirement'] } },
    options: [
      { name: 'Product Requirement', value: 'productRequirement', action: 'Product Requirement' },
    ], default: 'productRequirement' },
];

export const productRequirementFields: INodeProperties[] = [
  // TODO: add fields for productRequirement operations
];
