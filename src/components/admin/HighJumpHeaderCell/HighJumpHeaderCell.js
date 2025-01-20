import React from 'react';
import PropTypes from 'prop-types';
import styles from '../AdminDataTable/AdminDataTable.module.css';

const HighJumpHeaderCell = ({ column, heightAttempts }) => {
  return heightAttempts?.length ? (
    <div
      className={styles.attemptsHeaderCell}
      style={{
        gridTemplateColumns: `repeat(${heightAttempts?.length}, 1fr)`,
      }}
    >
      {heightAttempts.map((heightAttempt, index) => (
        <div
          key={index}
          style={column.headerStyle}
          className={styles.headerCell}
        >
          {heightAttempt.height} m
        </div>
      ))}
    </div>
  ) : null;
};

HighJumpHeaderCell.propTypes = {
  column: PropTypes.object.isRequired,
  heightAttempts: PropTypes.array.isRequired,
};

export default HighJumpHeaderCell;
