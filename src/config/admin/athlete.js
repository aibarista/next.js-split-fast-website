export const columns = [
  {
    accessor: 'clubAthleteNumber',
    label: 'Club ID',
    sortable: true,
    headerStyle: {
      fontSize: 13,
      paddingLeft: 21,
      minWidth: 154,
      letterSpacing: -0.3,
    },
    style: {
      fontSize: 13,
      paddingLeft: 21,
      minWidth: 154,
    },
  },
  {
    accessor: 'userName',
    label: 'Athlete Name',
    checkbox: false,
    sortable: true,
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
    accessor: 'ageGroup',
    label: 'Age',
    checkbox: false,
    sortable: false,
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
    accessor: 'gender',
    label: 'Gender',
    checkbox: false,
    sortable: false,
    filterable: true,
    headerStyle: {
      paddingLeft: 22,
      paddingRight: 10,
    },
    style: {
      paddingLeft: 22,
    },
  },
  {
    accessor: 'teams',
    label: 'Team(s)',
    checkbox: false,
    sortable: false,
    headerStyle: {
      paddingLeft: 20,
    },
    style: {
      paddingLeft: 20,
    },
  },
  {
    accessor: 'participationStatus',
    label: 'Participation Status',
    checkbox: false,
    sortable: false,
    filterable: true,
    headerStyle: {
      fontSize: 13,
      paddingLeft: 20,
      minWidth: 137,
      letterSpacing: -0.3,
    },
    style: {
      paddingLeft: 20,
      minWidth: 137,
    },
  },
  {
    accessor: 'manage',
    checkbox: false,
    sortable: false,
    style: {
      fontSize: 12,
      color: '#cf2c47',
      cursor: 'pointer',
      padding: '0 25px',
    },
  },
];

export const ageGroupOptions = [
  { value: '5', label: 'U5' },
  { value: '6', label: 'U6' },
  { value: '7', label: 'U7' },
  { value: '8', label: 'U8' },
  { value: '9', label: 'U9' },
  { value: '10', label: 'U10' },
  { value: '11', label: 'U11' },
  { value: '12', label: 'U12' },
  { value: '13', label: 'U13' },
  { value: '14-17', label: 'U14-17' },
  { value: '18', label: 'U18' },
  { value: '20', label: 'U20' },
  { value: 'Seniors', label: 'Seniors' },
  { value: 'Masters', label: 'Masters' },
];

export const participationStatusOptions = [
  { value: 'YES', label: 'YES' },
  { value: 'NO', label: 'NO' },
];
