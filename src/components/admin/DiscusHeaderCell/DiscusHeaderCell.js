import React from 'react';
import PropTypes from 'prop-types';
import styles from '../AdminDataTable/AdminDataTable.module.css';

const DiscusHeaderCell = ({ column, attemptCount }) => {
  return attemptCount ? (
    <div
      className={styles.attemptsHeaderCell}
      style={{
        gridTemplateColumns: `repeat(${attemptCount}, 1fr)`,
      }}
    >
      {Array.from({ length: attemptCount }).map((_, index) => (
        <div
          key={index}
          style={column.headerStyle}
          className={styles.headerCell}
        >
          Attempt{index + 1}
        </div>
      ))}
    </div>
  ) : null;
};

DiscusHeaderCell.propTypes = {
  attemptCount: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
};

export default DiscusHeaderCell;
