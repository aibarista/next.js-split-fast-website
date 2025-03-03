import { defaultBodyStyle } from './clubMembers';

// Define separate options for different event types
export const throwAttemptOptions = ['OK', 'Foul', 'No throw'];
export const jumpAttemptOptions = ['OK', 'Foul', 'No jump'];
export const highResultAttemptOptions = ['.', '-', 'X', 'O'];

const isJumpingEvent = (eventType) => {
  return ['Long Jump', 'Triple Jump'].includes(eventType);
};

export const getAttemptOptionsForEvent = (eventType) => {
  if (eventType === 'High Jump') {
    return highResultAttemptOptions;
  }
  return isJumpingEvent(eventType) ? jumpAttemptOptions : throwAttemptOptions;
};

export const getResultAttemptCount = (results) => {
  let count = 0;
  if (results[0]?.attempts?.length) {
    for (let i = 0; i < results.length; i++) {
      if (count < results[i]?.attempts?.length) {
        count = results[i]?.attempts?.length;
      }
    }
    return count;
  }
  return 0;
};

export const getResultHighJumpHeights = (results) => {
  let heighArrays = new Set();
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i]?.heightAttempts?.length; j++) {
      heighArrays.add(results[i]?.heightAttempts[j]?.height);
    }
  }
  return [...heighArrays].sort((a, b) => a - b);
};

export const resultColumns = (results) => {
  if (results[0]?.highJumpAttempts?.length) {
    return highJumpColumns(getResultHighJumpHeights(results).length);
  }
  if (results[0]?.attempts?.length) {
    return fieldEventColumns(getResultAttemptCount(results));
  }
  return trackEventColumns;
};

export const resultAttemptsCount = (results) => {
  if (results[0]?.highJumpAttempts?.length) {
    return results[0]?.highJumpAttempts?.length;
  }
  if (results[0]?.attempts?.length) {
    return getResultAttemptCount(results);
  }
  return 0;
};

export const trackEventColumns = [
  {
    accessor: 'athleteNumber',
    label: 'Club ID',
    headerStyle: {
      fontSize: 13,
      paddingLeft: 16,
      minWidth: 70,
      letterSpacing: -0.3,
    },
    style: {
      fontSize: 13,
      paddingLeft: 16,
      minWidth: 70,
    },
  },
  {
    accessor: 'athleteName',
    label: 'Name',
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
    accessor: 'athleteGender',
    label: 'Gender',
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
    accessor: 'athleteAge',
    label: 'Age',
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
    accessor: 'position',
    label: 'Position',
    checkbox: false,
    sortable: false,
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
    accessor: 'resultValue',
    label: 'Result',
    checkbox: false,
    sortable: false,
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
    accessor: 'pr',
    label: 'PB',
    checkbox: false,
    sortable: false,
    headerStyle: {
      paddingLeft: 22,
      paddingRight: 10,
    },
    style: {
      paddingLeft: 22,
    },
  },
  {
    accessor: 'status',
    label: 'Status',
    checkbox: false,
    sortable: false,
    headerStyle: {
      paddingLeft: 22,
      paddingRight: 10,
    },
    style: {
      paddingLeft: 22,
    },
  },
];

export const fieldEventColumns = (attemptNumber) => {
  return [
    {
      accessor: 'athleteNumber',
      label: 'Club ID',
      headerStyle: {
        fontSize: 13,
        paddingLeft: 16,
        minWidth: 90,
        letterSpacing: -0.3,
      },
      style: {
        fontSize: 13,
        paddingLeft: 16,
        minWidth: 90,
      },
    },
    {
      accessor: 'athleteName',
      label: 'Name',
      headerStyle: {
        paddingLeft: 20,
        justifyContent: 'space-between',
      },
      style: {
        paddingLeft: 20,
      },
    },
    {
      accessor: 'athleteGender',
      label: 'Gender',
      headerStyle: {
        paddingLeft: 20,
        justifyContent: 'space-between',
      },
      style: {
        paddingLeft: 20,
      },
    },
    {
      accessor: 'athleteAge',
      label: 'Age',
      headerStyle: {
        paddingLeft: 20,
        justifyContent: 'space-between',
      },
      style: {
        paddingLeft: 20,
      },
    },
    {
      accessor: 'position',
      label: 'Position',
      checkbox: false,
      sortable: false,
      headerStyle: {
        paddingLeft: 22,
        minWidth: 58,
      },
      style: {
        paddingLeft: 22,
        minWidth: 58,
      },
    },
    {
      accessor: 'result',
      label: 'Result',
      checkbox: false,
      sortable: false,
      headerStyle: {
        paddingLeft: 22,
        minWidth: 58,
      },
      style: {
        paddingLeft: 22,
        minWidth: 58,
      },
    },
    {
      accessor: 'pr',
      label: 'PB',
      checkbox: false,
      sortable: false,
      headerStyle: {
        paddingLeft: 22,
      },
      style: {
        paddingLeft: 22,
      },
    },
    {
      accessor: 'attempts',
      label: '',
      checkbox: false,
      sortable: false,
      headerStyle: {
        paddingLeft: 15,
        paddingRight: 10,
        minWidth: 90,
      },
      style: {
        display: 'grid',
        gridTemplateColumns: `repeat(${attemptNumber}, 1fr)`,
        minWidth: 90 * attemptNumber,
      },
    },
  ];
};

export const highJumpColumns = (attemptNumber) => {
  return [
    {
      accessor: 'athleteNumber',
      label: 'Club ID',
      headerStyle: {
        fontSize: 13,
        paddingLeft: 21,
        minWidth: 90,
        letterSpacing: -0.3,
      },
      style: {
        fontSize: 13,
        paddingLeft: 21,
        minWidth: 90,
      },
    },
    {
      accessor: 'athleteName',
      label: 'Name',
      headerStyle: {
        paddingLeft: 20,
        paddingRight: 25,
        justifyContent: 'space-between',
        minWidth: 154,
      },
      style: {
        paddingLeft: 20,
        minWidth: 154,
      },
    },
    {
      accessor: 'gender',
      label: 'Gender',
      headerStyle: {
        paddingLeft: 20,
        paddingRight: 25,
        justifyContent: 'space-between',
        minWidth: 88,
      },
      style: {
        paddingLeft: 20,
        minWidth: 88,
      },
    },
    {
      accessor: 'age',
      label: 'Age',
      headerStyle: {
        paddingLeft: 20,
        paddingRight: 25,
        justifyContent: 'space-between',
        minWidth: 70,
      },
      style: {
        paddingLeft: 20,
        minWidth: 70,
      },
    },
    {
      accessor: 'position',
      label: 'Position',
      checkbox: false,
      sortable: false,
      headerStyle: {
        paddingLeft: 22,
        paddingRight: 5,
        minWidth: 80,
      },
      style: {
        paddingLeft: 22,
        minWidth: 80,
      },
    },
    {
      accessor: 'result',
      label: 'Result',
      checkbox: false,
      sortable: false,
      headerStyle: {
        paddingLeft: 22,
        paddingRight: 5,
        minWidth: 90,
      },
      style: {
        paddingLeft: 22,
        minWidth: 90,
      },
    },
    {
      accessor: 'pr',
      label: 'PB',
      checkbox: false,
      sortable: false,
      headerStyle: {
        paddingLeft: 22,
        paddingRight: 10,
        minWidth: 90,
      },
      style: {
        paddingLeft: 22,
        minWidth: 90,
      },
    },
    {
      accessor: 'highJumpAttempts',
      label: '',
      checkbox: false,
      sortable: false,
      headerStyle: {
        paddingLeft: 10,
        minWidth: 90,
      },
      style: {
        display: 'grid',
        gridTemplateColumns: `repeat(${attemptNumber}, 2fr)`,
        minWidth: 90 * attemptNumber,
      },
    },
  ];
};

export const editTrackEventColumns = [
  {
    accessor: 'athleteNumber',
    label: 'Club ID',
    editable: true,
    editType: 'text',
    headerStyle: {
      fontSize: 13,
      paddingLeft: 21,
      minWidth: 154,
      letterSpacing: -0.3,
    },
    style: {
      fontSize: 13,
      paddingLeft: 10,
      minWidth: 154,
    },
  },
  {
    accessor: 'athleteName',
    label: 'Name',
    editable: true,
    editType: 'text',
    headerStyle: {
      paddingLeft: 20,
      paddingRight: 25,
      justifyContent: 'space-between',
    },
    style: {
      paddingLeft: 10,
    },
  },
  {
    accessor: 'athleteGender',
    label: 'Gender',
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
    accessor: 'athleteAge',
    label: 'Age',
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
    accessor: 'resultValue',
    label: 'Result (min:sec.ms)',
    checkbox: false,
    sortable: false,
    editable: true,
    editType: 'text',
    headerStyle: {
      paddingLeft: 10,
      paddingRight: 5,
      minWidth: 58,
    },
    style: {
      paddingLeft: 0,
      paddingRight: 10,
      minWidth: 58,
    },
  },
  {
    accessor: 'pr',
    label: 'PB',
    checkbox: false,
    sortable: false,
    headerStyle: {
      paddingLeft: 22,
      paddingRight: 10,
    },
    style: {
      paddingLeft: 22,
    },
  },
  {
    accessor: 'status',
    label: 'Status',
    checkbox: false,
    sortable: false,
    editable: true,
    editType: 'select',
    options: ['OK', 'DNF'],
    headerStyle: {
      paddingLeft: 22,
      paddingRight: 10,
    },
    style: {
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

export const editFieldEventColumns = (results, eventType) => {
  const columns = [
    {
      accessor: 'athleteNumber',
      label: 'Club ID',
      editable: true,
      editType: 'text',
      headerStyle: {
        fontSize: 13,
        paddingLeft: 20,
        minWidth: 154,
        letterSpacing: -0.3,
      },
      style: {
        fontSize: 13,
        paddingLeft: 10,
        minWidth: 154,
      },
    },
    {
      accessor: 'athleteName',
      label: 'Name',
      editable: true,
      editType: 'text',
      headerStyle: {
        paddingLeft: 20,
        paddingRight: 25,
        minWidth: 150,
        justifyContent: 'space-between',
      },
      style: {
        paddingLeft: 10,
        minWidth: 150,
      },
    },
  ];
  const heighArrays = getResultHighJumpHeights(results);
  const options = getAttemptOptionsForEvent(eventType);
  if (eventType === 'High Jump') {
    for (let index = 0; index < heighArrays.length; index++) {
      columns.push({
        accessor: `heightAttempts${index}`,
        label: `Height`,
        checkbox: false,
        sortable: false,
        editable: true,
        editType: 'highJumpAttempt',
        headerStyle: {
          paddingLeft: 22,
          paddingRight: 5,
          minWidth: 180,
        },
        style: {
          paddingLeft: 22,
          paddingRight: 10,
          minWidth: 180,
        },
        options: options,
      });
    }
    return columns;
  }
  for (let index = 0; index < results[0]?.attempts.length; index++) {
    columns.push({
      accessor: `attempt${index + 1}`,
      label: `Attempt ${index + 1}`,
      checkbox: false,
      sortable: false,
      editable: true,
      editType: 'attempt',
      headerStyle: {
        paddingLeft: 22,
        paddingRight: 5,
      },
      style: {
        paddingLeft: 22,
        paddingRight: 10,
      },
      options: options,
    });
  }
  return columns;
};

export const editColumnPrimaryField = 'resultID';
