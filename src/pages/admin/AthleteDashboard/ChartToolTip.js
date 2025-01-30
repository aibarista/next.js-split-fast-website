import React from 'react';
import PropTypes from 'prop-types';
import { convertMillisecondsToRecord } from 'utils/time';

export const ChartToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value =
      payload[0].payload.unit === 'm'
        ? payload[0].value
        : convertMillisecondsToRecord(payload[0].value * 1000, 2);
    return (
      <div
        style={{
          background: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      >
        <p>{`Date: ${payload[0].payload.name}`}</p>
        <p>{`Value: ${value}`}</p>
      </div>
    );
  }
  return null;
};

ChartToolTip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};

export default ChartToolTip;
