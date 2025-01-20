export const participationStatusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export const columns = [
  {
    accessor: 'name',
    label: 'Member Name',
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
    accessor: 'profiles',
    label: 'Athlete Profiles',
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
    accessor: 'role',
    label: 'Role',
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
    accessor: 'participationStatus',
    label: 'Club Status',
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
    accessor: 'invitationStatus',
    label: 'Portal Access',
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

export const dataTypeOptions = [
  { value: 'general', label: 'General' },
  { value: 'notifications', label: 'Notifications' },
];

export const defaultHeaderStyle = {
  fontSize: 14,
  color: '#889398',
  fontWeight: 700,
  border: 'none',
  paddingBottom: 0,
};

export const defaultBodyStyle = {
  fontSize: 16,
  color: '#24282a',
  fontWeight: 600,
  background: '#fff',
  border: 'none',
  paddingTop: 12,
  paddingBottom: 12,
};

export const athleteColumns = [
  {
    accessor: 'clubAthleteNumber',
    label: 'Club ID',
    headerStyle: {
      ...defaultHeaderStyle,
      paddingLeft: 21,
      minWidth: 154,
      letterSpacing: -0.3,
    },
    style: {
      ...defaultBodyStyle,
      paddingLeft: 21,
      minWidth: 154,
    },
  },
  {
    accessor: 'athleteName',
    label: 'Name',
    headerStyle: {
      ...defaultHeaderStyle,
      paddingLeft: 20,
      paddingRight: 25,
      justifyContent: 'space-between',
    },
    style: {
      ...defaultBodyStyle,
      paddingLeft: 20,
    },
  },
  {
    accessor: 'gender',
    label: 'Gender',
    checkbox: false,
    sortable: false,
    headerStyle: {
      ...defaultHeaderStyle,
      paddingLeft: 22,
      paddingRight: 5,
      minWidth: 58,
    },
    style: {
      ...defaultBodyStyle,
      paddingLeft: 22,
      minWidth: 58,
    },
  },
  {
    accessor: 'ageGroup',
    label: 'Age',
    checkbox: false,
    sortable: false,
    headerStyle: {
      ...defaultHeaderStyle,
      paddingLeft: 22,
      paddingRight: 5,
      minWidth: 58,
    },
    style: {
      ...defaultBodyStyle,
      paddingLeft: 22,
      minWidth: 58,
    },
  },
  {
    accessor: 'participationStatus',
    label: 'Participating',
    checkbox: false,
    sortable: false,
    headerStyle: {
      ...defaultHeaderStyle,
      paddingLeft: 22,
      paddingRight: 10,
    },
    style: {
      ...defaultBodyStyle,
      paddingLeft: 22,
    },
  },
  {
    accessor: 'buttons',
    label: '',
    checkbox: false,
    sortable: false,
    headerStyle: {
      paddingLeft: 22,
      paddingRight: 10,
    },
    style: {
      ...defaultBodyStyle,
      paddingLeft: 22,
    },
  },
];
