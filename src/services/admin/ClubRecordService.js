import { convertDateTime, convertMillisecondsToRecord } from 'utils/time';

export const getOfficialRecordTableSortData = (records) => {
  const tableRecords = [];

  records.forEach((record) => {
    tableRecords.push({
      ...record,
      timestamp: convertDateTime(record.achievedAt).date,
      ageGroup: record.athleteAge,
      result:
        [
          'Discus',
          'Javelin',
          'Shot Put',
          'High Jump',
          'Long Jump',
          'Triple Jump',
        ].indexOf(record.eventType) > -1
          ? `${parseFloat(record?.recordValue).toFixed(2)} m`
          : `${convertMillisecondsToRecord(record?.recordValue, 2)}`,
    });
  });

  return tableRecords.sort((a, b) => {
    if (a.gender !== b.gender) {
      return a.gender === 'Female' ? -1 : 1;
    }
    if (parseInt(a.ageGroup) !== parseInt(b.ageGroup)) {
      return parseInt(a.ageGroup) - parseInt(b.ageGroup);
    }
    return b.eventType.localeCompare(a.eventType);
  });
};

export const getPendingRecordTableSortData = (records) => {
  const tableRecords = [];

  records.forEach((record) => {
    tableRecords.push({
      ...record,
      ageGroup: record.athleteAge,
      athleteName: `${record.athleteFirstName} ${record.athleteLastName}`,
      timestamp: convertDateTime(record.meetDate).date,
      result:
        [
          'Discus',
          'Javelin',
          'Shot Put',
          'High Jump',
          'Long Jump',
          'Triple Jump',
        ].indexOf(record.eventType) > -1
          ? `${parseFloat(record?.performanceValue).toFixed(2)} m`
          : `${convertMillisecondsToRecord(record?.performanceValue, 2)}`,
    });
  });

  return tableRecords.sort((a, b) => {
    if (a.gender !== b.gender) {
      return a.gender === 'Female' ? -1 : 1;
    }
    if (parseInt(a.ageGroup) !== parseInt(b.ageGroup)) {
      return parseInt(a.ageGroup) - parseInt(b.ageGroup);
    }
    return b.eventType.localeCompare(a.eventType);
  });
};
