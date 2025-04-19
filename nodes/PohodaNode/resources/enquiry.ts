import { INodeProperties } from 'n8n-workflow';

export const enquiryOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['enquiry'] } },
    options: [
      { name: 'Enquiry', value: 'enquiry', action: 'Enquiry' },
    ], default: 'enquiry' },
];

export const enquiryFields: INodeProperties[] = [
  // TODO: add fields for enquiry operations
];
