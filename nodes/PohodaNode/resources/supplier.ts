import { INodeProperties } from 'n8n-workflow';

export const supplierOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['supplier'] } },
    options: [
      { name: 'Supplier', value: 'supplier', action: 'Supplier' },
    ], default: 'supplier' },
];

export const supplierFields: INodeProperties[] = [
  // TODO: add fields for supplier operations
];
