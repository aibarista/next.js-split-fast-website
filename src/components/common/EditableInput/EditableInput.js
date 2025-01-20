import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditableInput.module.css';

const EditableInput = ({ value, inputValueChange }) => {
  const [tempValue, setTempValue] = useState(value);

  
  // Handle both direct input and spinner button changes
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setTempValue(newValue);
    
    // For spinner buttons, we want to format and save immediately
    if (e.nativeEvent.inputType === 'insertReplacementText' || 
        e.nativeEvent.inputType === 'insertFromPaste' ||
        e.nativeEvent.inputType === 'insertFromDropdown' ||
        !e.nativeEvent.inputType) { // Spinner buttons don't set inputType
      const formattedValue = parseFloat(newValue).toFixed(2);
      if (!isNaN(formattedValue)) {
        setTempValue(formattedValue);
        inputValueChange(formattedValue);
      }
    }
  };


  // Handle blur for direct keyboard input
  const handleInputBlur = () => {
    const formattedValue = parseFloat(tempValue).toFixed(2);
    if (!isNaN(formattedValue)) {
      setTempValue(formattedValue);
      inputValueChange(formattedValue);
    } else {
      // If invalid input, revert to last valid value
      setTempValue(parseFloat(value).toFixed(2));
    }
  };

  
  useEffect(() => {
    setTempValue(parseFloat(value).toFixed(2));
  }, [value]);

  return (
    <input
      className={styles.cellInput}
      value={tempValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      type="number"
      min="0"
      step="0.01"
    />
  );
};

EditableInput.propTypes = {
  value: PropTypes.string,
  inputValueChange: PropTypes.func,
};

export default EditableInput;
