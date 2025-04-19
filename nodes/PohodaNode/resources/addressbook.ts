import { INodeProperties } from 'n8n-workflow';

export const addressbookOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['addressbook'] } },
    options: [
      { name: 'Addressbook', value: 'addressbook', action: 'Addressbook' },
    ], default: 'addressbook' },
];

export const addressbookFields: INodeProperties[] = [
  // TODO: add fields for addressbook operations
];
