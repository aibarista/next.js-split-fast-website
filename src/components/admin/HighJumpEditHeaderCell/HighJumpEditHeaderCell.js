import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../AdminDataTable/AdminDataTable.module.css';

const HighJumpEditHeaderCell = ({ column, value, inputValueChange}) => {

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

  return (
    <div
      className={styles.headerCell}
      style={column.headerStyle}
    >
      {column.label}
      <input
        className={styles.headerTextInput}
        value={tempValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        type="number"
        min="0.50"
        max="2.50"
        step="0.01"
      />
    </div>
  );
};

HighJumpEditHeaderCell.propTypes = {
    column: PropTypes.object.isRequired,
    value: PropTypes.number,
    inputValueChange: PropTypes.func,
};

export default HighJumpEditHeaderCell;
