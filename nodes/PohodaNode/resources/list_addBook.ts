import { INodeProperties } from 'n8n-workflow';

export const list_addBookOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['list_addBook'] } },
    options: [
      { name: 'List Address Book', value: 'listAddressBook', action: 'List Address Book' },
    ], default: 'listAddressBook' },
];

export const list_addBookFields: INodeProperties[] = [
  // TODO: add fields for list_addBook operations
];
