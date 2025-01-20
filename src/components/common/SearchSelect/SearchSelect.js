import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchSelect.module.css';

import SelectIcon from 'assets/images/select.png';
import { ReactComponent as CloseIcon } from 'assets/images/icon_close.svg';

const SearchSelect = ({
  title,
  label,
  options = [],
  selectedOptions = [],
  addFilterValues,
  removeFilterValues,
  columnKey,
  placeholder,
  style,
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedValues, setSelectedValues] = useState(selectedOptions);

  const filteredOptions = options.filter((option) => {
    if (showSelect) {
      return option.toString().toLowerCase().includes(searchText.toLowerCase());
    } else {
      return false;
    }
  });

  const handleChange = (e) => {
    if (e.target.value === '') {
      setShowSelect(false);
    } else {
      setShowSelect(true);
    }
    setSearchText(e.target.value);
  };

  const handleSelect = (option) => {
    addFilterValues(columnKey, option);
    setSearchText('');
    setShowSelect(false);
  };

  const removeTag = (value) => {
    removeFilterValues(columnKey, value);
  };

  useEffect(() => {
    if (JSON.stringify(selectedOptions) !== JSON.stringify(selectedValues)) {
      setSelectedValues(selectedOptions);
    }
  }, [selectedOptions, selectedValues]);

  return (
    <div style={style}>
      <div className={styles.inputTitle}>{title}</div>
      <label className={styles.inputLabel}>{label}</label>
      <div className={styles.inputOptionWrapper}>
        <input
          type="text"
          className={styles.overlaidInput}
          placeholder={placeholder}
          value={searchText}
          onChange={handleChange}
        />
        <div
          className={styles.optionsWrapper}
          style={!showSelect ? { display: 'none' } : null}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
          {filteredOptions.length === 0 && <div>No options found</div>}
        </div>
        <img
          src={SelectIcon}
          alt="select"
          onClick={() => setShowSelect(!showSelect)}
        />
      </div>
      <div className={styles.tags}>
        {selectedValues.map((tag, index) => (
          <div className={styles.tag} key={index}>
            <div className={styles.tagText}>{tag}</div>
            <div className={styles.closeIcon} onClick={() => removeTag(tag)}>
              <CloseIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SearchSelect.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any),
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.object,
  addFilterValues: PropTypes.func,
  removeFilterValues: PropTypes.func,
  columnKey: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchSelect;
