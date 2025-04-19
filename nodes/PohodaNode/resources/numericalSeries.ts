import { INodeProperties } from 'n8n-workflow';

export const numericalSeriesOperations: INodeProperties[] = [
  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
    displayOptions: { show: { resource: ['numericalSeries'] } },
    options: [
      { name: 'Numerical Series', value: 'numericalSeries', action: 'Numerical Series' },
    ], default: 'numericalSeries' },
];

export const numericalSeriesFields: INodeProperties[] = [
  // TODO: add fields for numericalSeries operations
];
