import React from 'react';
import PropTypes from 'prop-types';
import styles from '../AdminDataTable/AdminDataTable.module.css';

import { ReactComponent as SortIcon } from 'assets/images/icon_sort.svg';

const DefaultHeaderCell = ({ column, sortConfig, handleSort }) => {
  return (
    <div
      className={styles.headerCell}
      style={column.headerStyle}
      onClick={() => column.sortable && handleSort(column.accessor)}
    >
      {column.checkbox ? <div className={styles.headerCheckbox}></div> : null}
      {column.label}
      {column.sortable ? (
        <div className={styles.headerSortImage}>
          <SortIcon
            style={{
              cursor: 'pointer',
              transform:
                sortConfig.key === column.accessor
                  ? sortConfig.direction === 'asc'
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)'
                  : 'rotate(0deg)',
              fill: '#000',
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

DefaultHeaderCell.propTypes = {
  column: PropTypes.object,
  sortConfig: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    direction: PropTypes.string,
  }),
  handleSort: PropTypes.func,
};

export default DefaultHeaderCell;
