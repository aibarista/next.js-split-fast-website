export const dataTypeOptions = [
  {
    value: 'upcoming',
    label: 'Upcoming',
  },
  {
    value: 'complete',
    label: 'Complete',
  },
  {
    value: 'draft',
    label: 'Draft',
    allowedRoles: ['Owner', 'Admin', 'Official'],
  },
];

export const viewTypeOptions = [];

export const columns = [
  {
    accessor: 'date',
    label: 'Date',
    sortable: true,
    headerStyle: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    style: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  {
    accessor: 'time',
    label: 'Time',
    headerStyle: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    style: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  {
    accessor: 'meetName',
    label: 'Competition Title',
    headerStyle: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    style: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  {
    accessor: 'location',
    label: 'Location',
    headerStyle: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    style: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  {
    accessor: 'age',
    label: 'Age',
    headerStyle: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    style: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  {
    accessor: 'meetStatus',
    label: 'Status',
    headerStyle: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    style: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  {
    accessor: 'buttons',
    label: '',
    headerStyle: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    style: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
];
