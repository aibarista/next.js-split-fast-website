import { tableButtonStyle } from 'config/global';

export const meetTableRowLimit = 3;
export const upcomingTableRowLimit = 4;
export const resultHighlightsTableRowLimit = 8;

export const meetTableColumns = [
  { accessor: 'date' },
  { accessor: 'time' },
  { accessor: 'meetName', style: { fontSize: '13px' } },
  { accessor: 'location', style: { fontWeight: '400' } },
  {
    accessor: 'buttons',
    style: {
      ...tableButtonStyle,
      backgroundColor: 'transparent',
      margin: '0 0 0 auto',
    },
  },
];

export const highlightTableColumns = [
  { accessor: 'date' },
  { accessor: 'eventType' },
  { accessor: 'gender' },
  { accessor: 'ageGroup' },
  { accessor: 'athleteName' },
  {
    accessor: 'resultValue',
    style: {
      textAlign: 'right',
    },
  },
  {
    accessor: 'isPR',
  },
  {
    accessor: 'url',
    style: {
      ...tableButtonStyle,
      backgroundColor: 'transparent',
      margin: '0 0 0 auto',
    },
  },
];
