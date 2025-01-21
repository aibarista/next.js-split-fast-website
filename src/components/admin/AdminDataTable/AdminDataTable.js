import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AdminDataTable.module.css';

import TableFilter from 'components/admin/TableFilter';
import EditableInput from 'components/common/EditableInput';
import DefaultHeaderCell from 'components/admin/DefaultHeaderCell';
import HighJumpEditHeaderCell from 'components/admin/HighJumpEditHeaderCell';

import { ReactComponent as SearchIcon } from 'assets/images/icon_search.svg';
import { ReactComponent as FilterIcon } from 'assets/images/icon_filter.svg';
import DiscusHeaderCell from '../DiscusHeaderCell';
import HighJumpHeaderCell from '../HighJumpHeaderCell';

const AdminDataTable = ({
  data = [],
  isEditable = false,
  isAddedFeatures = true,
  columns,
  headStyle,
  rowStyle,
  tableStyle,
  searchInputPlaceholder,
  borderType = 'default',
  isShadow = true,
  handleValueChange,
  primaryField = 'id',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  useEffect(() => {
    const generatedFilters = {};
    columns.forEach((column) => {
      if (column.filterable) {
        generatedFilters[column.accessor] = {
          label: column.label,
          values: [
            ...new Set(
              data
                .map((row) => row[column.accessor])
                .filter((value) => value !== undefined && value !== null)
            ),
          ],
          selectedValue: [],
        };
      }
    });
    setFilters(generatedFilters);
  }, [data, columns]);

  const filteredData = data.filter((row) => {
    const matchesSearch = columns.some((column) => {
      const cellValue = row[column.accessor];
      return (
        cellValue &&
        cellValue.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    const matchesFilters = Object.keys(filters).every((key) => {
      const filterValue = filters[key].selectedValue;
      return (
        !filterValue ||
        !filterValue.length ||
        filterValue.includes(row[key]?.toString())
      );
    });

    return matchesSearch && matchesFilters;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    console.log('filteredData', filteredData)
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleFilterChange = (filters) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key]) {
          newFilters[key].selectedValue = filters[key] || [];
        }
      });
      return newFilters;
    });
  };

  return (
    <>
      <div
        className={styles.athletesTableWrapper}
        style={isShadow ? null : { boxShadow: 'unset' }}
      >
        <div className={styles.athletesTable} style={tableStyle}>
          {isAddedFeatures ? (
            <div className={styles.athletesTableHeader}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder={searchInputPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <SearchIcon />
              </div>
              {Object.keys(filters).length > 0 && (
                <div
                  className={styles.filterWrapper}
                  onClick={() => setShowFilterPopup(true)}
                >
                  <div className={styles.filterText}>Filter</div>
                  <div className={styles.filterImage}>
                    <FilterIcon />
                  </div>
                </div>
              )}
            </div>
          ) : null}
          <div
            className={`${styles.athletesRows} ${borderType === 'full' ? styles.fullBorder : null}`}
            style={borderType === 'none' ? { border: 'none' } : null}
          >
            <div className={styles.athletesRow} style={headStyle}>
              {columns.map((column, index) => {
                switch (column.accessor) {
                  case 'attempts':
                    return (
                      <DiscusHeaderCell
                        key={index}
                        column={column}
                        attemptCount={data[0]?.attempts?.length}
                      />
                    );

                  case 'highJumpAttempts':
                    return (
                      <HighJumpHeaderCell
                        key={index}
                        column={column}
                        heightAttempts={data[0]?.heightAttempts}
                      />
                    );
                  case `heightAttempts${index-2}`:
                    return (
                      <HighJumpEditHeaderCell
                        key={index}
                        value={data[0]?.heightAttempts[index-2]?.height}
                        column={column}
                        inputValueChange={(value) =>
                          handleValueChange(
                            data[0][primaryField],
                            `heightAttempts${index-2}`,
                            value,
                            'height'
                          )
                        }
                      />
                    );
                  default:
                    return (
                      <DefaultHeaderCell
                        key={index}
                        column={column}
                        sortConfig={sortConfig}
                        handleSort={handleSort}
                      />
                    );
                }
              })}
            </div>
            {sortedData.map((row, i) => (
              <div key={i} className={styles.athletesRow} style={rowStyle}>
                {columns.map((column, i) => (
                  <div
                    key={i}
                    className={styles.childCell}
                    style={column.style}
                  >
                    {column.checkbox ? (
                      <div className={styles.bodyCheckbox}></div>
                    ) : null}
                    {column.editable && isEditable
                      ? (() => {
                          switch (column.editType) {
                            case 'attempt':
                              return (
                                <>
                                  <EditableInput
                                    value={
                                      row[column.accessor]?.status !==
                                      'No Throw'
                                        ? Number(
                                            row[column.accessor]?.distance || 0
                                          ).toFixed(2)
                                        : '0.00'
                                    }
                                    inputValueChange={(value) =>
                                      handleValueChange(
                                        row[primaryField],
                                        column.accessor,
                                        value,
                                        'distance'
                                      )
                                    }
                                  />
                                  <select
                                    className={styles.cellSelect}
                                    value={
                                      row[column.accessor]?.status || 'No Throw'
                                    }
                                    onChange={(e) => {
                                      handleValueChange(
                                        row[primaryField],
                                        column.accessor,
                                        e.target.value,
                                        'status'
                                      );
                                      if (e.target.value === 'No throw') {
                                        handleValueChange(
                                          row[primaryField],
                                          column.accessor,
                                          0,
                                          'distance'
                                        );
                                      }
                                    }}
                                  >
                                    {column.options?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </>
                              );
                            case 'highJumpAttempt':
                              return (
                                <>
                                  <select
                                    className={styles.cellSelectHighJump}
                                    value={
                                      row[column.accessor]?.attempt1
                                    }
                                    onChange={(e) => {
                                      handleValueChange(
                                        row[primaryField],
                                        column.accessor,
                                        e.target.value,
                                        'attempt1'
                                      );
                                    }}
                                  >
                                    {column.options?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                  <select
                                    className={styles.cellSelectHighJump}
                                    value={
                                      row[column.accessor]?.attempt2
                                    }
                                    onChange={(e) => {
                                      handleValueChange(
                                        row[primaryField],
                                        column.accessor,
                                        e.target.value,
                                        'attempt2'
                                      );
                                    }}
                                  >
                                    {column.options?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                  <select
                                    className={styles.cellSelectHighJump}
                                    value={
                                      row[column.accessor]?.attempt3
                                    }
                                    onChange={(e) => {
                                      handleValueChange(
                                        row[primaryField],
                                        column.accessor,
                                        e.target.value,
                                        'attempt3'
                                      );
                                    }}
                                  >
                                    {column.options?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </>
                              );
                            case 'text':
                              return (
                                <input
                                  className={styles.cellTextInput}
                                  value={row[column.accessor]}
                                  onChange={(e) =>
                                    handleValueChange(
                                      row[primaryField],
                                      column.accessor,
                                      e.target.value
                                    )
                                  }
                                />
                              );
                            case 'select':
                              return (
                                <select
                                  className={styles.cellSelect}
                                  value={row[column.accessor]}
                                  onChange={(e) =>
                                    handleValueChange(
                                      row[primaryField],
                                      column.accessor,
                                      e.target.value
                                    )
                                  }
                                >
                                  {column.options?.map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              );
                            default:
                              return <></>;
                          }
                        })()
                      : row[column.accessor]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <TableFilter
        filters={filters}
        showPopup={showFilterPopup}
        closePopup={() => setShowFilterPopup(false)}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
};

AdminDataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  headStyle: PropTypes.object,
  rowStyle: PropTypes.object,
  tableStyle: PropTypes.object,
  searchInputPlaceholder: PropTypes.string,
  isAddedFeatures: PropTypes.bool,
  borderType: PropTypes.string,
  isShadow: PropTypes.bool,
  isEditable: PropTypes.bool,
  handleValueChange: PropTypes.func,
  primaryField: PropTypes.string,
};

export default AdminDataTable;
