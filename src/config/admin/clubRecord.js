export const dataTypeOptions = [
  { value: 'published', label: 'Official Records' },
  {
    value: 'pending',
    label: 'Pending Records',
    allowedRoles: ['Owner', 'Admin', 'Official'],
  },
];

export const publishColumns = [
  {
    accessor: 'eventType',
    label: 'Event',
    filterable: true,
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
    accessor: 'athleteAge',
    label: 'Age Group',
    filterable: true,
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
    accessor: 'gender',
    label: 'Gender',
    filterable: true,
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
    accessor: 'result',
    label: 'Result',
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
    accessor: 'athleteName',
    label: 'Athlete',
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
    accessor: 'timestamp',
    label: 'Date',
    filterable: true,
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

export const pendingColumns = [
  {
    accessor: 'eventType',
    label: 'Event',
    filterable: true,
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
    accessor: 'athleteAge',
    label: 'Age Group',
    filterable: true,
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
    accessor: 'gender',
    label: 'Gender',
    filterable: true,
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
    accessor: 'result',
    label: 'Result',
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
    accessor: 'athleteName',
    label: 'Athlete',
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
    accessor: 'timestamp',
    label: 'Date',
    filterable: true,
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
