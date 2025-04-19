import { INodeProperties } from 'n8n-workflow';

export const userAgendaOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['userAgenda'] } },
    options: [
      { name: 'User Agenda', value: 'userAgenda', action: 'User Agenda' },
    ], default: 'userAgenda' },
];

export const userAgendaFields: INodeProperties[] = [
  // TODO: add fields for userAgenda operations
];
