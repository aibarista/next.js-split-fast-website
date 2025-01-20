import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TableFilter.module.css';

import CloseIcon from 'assets/images/icon_close.svg';
import SearchSelect from 'components/common/SearchSelect';

const TableFilter = ({
  filters,
  showPopup,
  closePopup,
  handleFilterChange,
}) => {
  console.log('filters: ', filters);
  const [selectedFilterValues, setSelectedFilterValues] = useState({});

  const getFilterValueNumber = () => {
    let selectedFilterValueNumber = 0;
    Object.keys(selectedFilterValues).forEach((filterKey) => {
      const filterValue = selectedFilterValues[filterKey];
      if (filterValue) {
        selectedFilterValueNumber += filterValue.length;
      }
    });
    return selectedFilterValueNumber;
  };

  const addFilterValues = (key, value) => {
    if (value) {
      setSelectedFilterValues((prevState) => {
        const currentValues = prevState[key] || [];
        const newFilter = Array.from(new Set([...currentValues, value]));

        return { ...prevState, [key]: newFilter };
      });
    }
  };

  const removeFilterValues = (key, value) => {
    if (value) {
      setSelectedFilterValues((prevState) => {
        const currentValues = prevState[key] || [];
        const newFilter = currentValues.filter((val) => val !== value);

        return { ...prevState, [key]: newFilter };
      });
    }
  };

  return (
    <div
      className={`${styles.filterPopupOverlay} ${showPopup ? styles.active : null}`}
    >
      <div className={styles.filterPopup}>
        <div className={styles.filterPopupContainer}>
          <h3 className={styles.title}>Filter Results</h3>
          <div className={styles.inputContainer}>
            {Object.keys(filters).map((columnKey) =>
              filters[columnKey].values.length > 1 ? (
                <SearchSelect
                  key={columnKey}
                  title={`Filter by ${filters[columnKey].label}`}
                  label={`Only these ${filters[columnKey].label}s`}
                  columnKey={columnKey}
                  options={filters[columnKey].values}
                  selectedOptions={selectedFilterValues[columnKey]}
                  addFilterValues={addFilterValues}
                  removeFilterValues={removeFilterValues}
                  placeholder={`Type or select ${filters[columnKey].label.toLowerCase()}`}
                />
              ) : null
            )}
          </div>
          <div className={styles.publishButtons}>
            <div
              className={`${styles.publishButton} ${getFilterValueNumber() ? styles.active : null}`}
              onClick={() => {
                setSelectedFilterValues({});
                handleFilterChange({});
                closePopup();
              }}
            >
              Clear All Filters
            </div>
            <div
              className={`${styles.publishButton} ${styles.active}`}
              onClick={() => {
                handleFilterChange(selectedFilterValues);
                closePopup();
              }}
            >
              Apply Filters({getFilterValueNumber()})
            </div>
          </div>
        </div>
        <div className={styles.publishCloseBtn} onClick={closePopup}>
          <img src={CloseIcon || ''} alt="close" />
        </div>
      </div>
    </div>
  );
};

TableFilter.propTypes = {
  filters: PropTypes.object,
  showPopup: PropTypes.bool.isRequired,
  closePopup: PropTypes.func,
  handleFilterChange: PropTypes.func,
  columnKey: PropTypes.string,
};

export default TableFilter;
