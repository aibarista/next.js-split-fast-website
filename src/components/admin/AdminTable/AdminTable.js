import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminTable.module.css';

const AdminTable = ({ data, columns, rowStyle, tableStyle }) => {
  return (
    <div className={styles.rows}>
      <div className={styles.wrapper} style={tableStyle}>
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row} style={rowStyle}>
            {columns.map((column) => {
              return (
                <div
                  key={column.accessor}
                  className={styles.cell}
                  style={column.style}
                >
                  {row[column.accessor]}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

AdminTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string.isRequired,
      style: PropTypes.object,
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
  rowStyle: PropTypes.object,
  tableStyle: PropTypes.object,
};

export default AdminTable;
