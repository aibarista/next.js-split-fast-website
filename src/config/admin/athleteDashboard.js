import { tableBodyStyle, tableHeaderStyle } from 'config/global';

export const recentMeetColumns = [
  {
    accessor: 'eventType',
    label: 'Event',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'result',
    label: 'Result',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'position',
    label: 'Position',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'status',
    label: 'Status',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'seasonPRValue',
    label: 'Season PB',
    checkbox: false,
    sortable: false,
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'buttons',
    label: 'Results',
    checkbox: false,
    sortable: false,
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
];

export const pastMeetsColumns = [
  {
    accessor: 'date',
    label: 'Date',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'eventType',
    label: 'Event',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'result',
    label: 'Results',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'position',
    label: 'Position',
    checkbox: false,
    sortable: false,
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'status',
    label: 'Status',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'seasonPRValue',
    label: 'Season PB',
    checkbox: false,
    sortable: false,
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
];

export const historyResultDataColumns = [
  {
    accessor: 'date',
    label: 'Date',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'result',
    label: 'Result',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'position',
    label: 'Position',
    checkbox: false,
    sortable: false,
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
  {
    accessor: 'status',
    label: 'Status',
    headerStyle: tableHeaderStyle,
    style: tableBodyStyle,
  },
];
