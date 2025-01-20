import React from 'react';
import PropTypes from 'prop-types';
import AdminDataTable from 'components/admin/AdminDataTable';
import { getResultAttemptCount, resultColumns } from 'config/admin/result';

const ResultDataTable = ({ results, eventType }) => {
  return results.length ? (
    <AdminDataTable
      borderType="full"
      isAddedFeatures={false}
      columns={resultColumns(results)}
      data={results}
      searchInputPlaceholder=""
      headStyle={{
        gridTemplateColumns:
          results[0]?.unit === 'm' || eventType === 'High Jump'
            ? `1fr 4fr 2fr 2fr 2fr 2fr 2fr ${2 * getResultAttemptCount(results)}fr`
            : '2fr 4fr 3fr 3fr 3fr 3fr 3fr 4fr',
        background: '#f1f1f2',
      }}
      rowStyle={{
        gridTemplateColumns:
          results[0]?.unit === 'm' || eventType === 'High Jump'
            ? `1fr 4fr 2fr 2fr 2fr 2fr 2fr ${2 * getResultAttemptCount(results)}fr`
            : '2fr 4fr 3fr 3fr 3fr 3fr 3fr 4fr',
      }}
    />
  ) : null;
};

ResultDataTable.propTypes = {
  results: PropTypes.array.isRequired,
  eventType: PropTypes.string,
};

export default ResultDataTable;
