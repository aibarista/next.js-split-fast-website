import { tableButtonStyle } from '../global';

export const dataTypeOptions = [
  { value: 'published', label: 'Published Results' },
  {
    value: 'pending',
    label: 'Pending Results',
    allowedRoles: ['Owner', 'Admin', 'Official'],
  },
];

export const columns = [
  {
    accessor: 'eventType',
    label: 'Event',
    checkbox: false,
    filterable: true,
    headerStyle: {
      paddingLeft: 20,
      paddingRight: 25,
      justifyContent: 'space-between',
    },
    style: {
      paddingLeft: 20,
    },
  },
  {
    accessor: 'gender',
    label: 'Gender',
    checkbox: false,
    filterable: true,
    headerStyle: {
      paddingLeft: 22,
      paddingRight: 5,
      minWidth: 58,
    },
    style: {
      paddingLeft: 22,
      minWidth: 58,
    },
  },
  {
    accessor: 'ageGroup',
    label: 'Age Group',
    checkbox: false,
    filterable: true,
    headerStyle: {
      paddingLeft: 22,
      paddingRight: 5,
      minWidth: 58,
    },
    style: {
      paddingLeft: 22,
      minWidth: 58,
    },
  },
  {
    accessor: 'roundType',
    label: 'Round Type',
    checkbox: false,
    filterable: true,
    headerStyle: {
      paddingLeft: 20,
    },
    style: {
      paddingLeft: 20,
    },
  },
  {
    accessor: 'manage',
    label: 'Results',
    headerStyle: {
      paddingLeft: 20,
    },
    style: {
      ...tableButtonStyle,
      backgroundColor: 'transparent',
      margin: '0 auto 0 5px',
    },
  },
];
