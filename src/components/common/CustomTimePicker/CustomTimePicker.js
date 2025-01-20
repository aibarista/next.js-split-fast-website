import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomTimePicker.module.css';
import ClockIcon from 'assets/images/clock.png';

const CustomTimePicker = ({
  label,
  style,
  value,
  placeholder,
  onTimeChange,
  timezoneList = [],
  selectedTimezone,
  handleTimezoneChange,
  error,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('--');
  const [selectedMinute, setSelectedMinute] = useState('--');
  const timePickerRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTimeSelect = () => {
    const formattedTime = `${selectedHour}:${selectedMinute}`;
    onTimeChange && onTimeChange(formattedTime);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (e) => {
    if (timePickerRef.current && !timePickerRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles.timePickerContainer}
      ref={timePickerRef}
      style={style}
    >
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper} onClick={handleToggleDropdown}>
        <input
          type="text"
          className={styles.input}
          value={value}
          placeholder={placeholder}
          readOnly
        />
        <img className={styles.icon} src={ClockIcon} alt="icon_clock" />
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownColumns}>
            <div className={styles.dropdownColumn}>
              <span>Hour</span>
              <div className={styles.options}>
                {Array.from({ length: 24 }, (_, i) =>
                  String(i).padStart(2, '0')
                ).map((hour) => (
                  <div
                    key={hour}
                    className={`${styles.dropdownItem} ${selectedHour === hour ? styles.selected : ''}`}
                    onClick={() => setSelectedHour(hour)}
                  >
                    {hour}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.dropdownColumn}>
              <span>Minute</span>
              <div className={styles.options}>
                {Array.from({ length: 60 }, (_, i) =>
                  String(i).padStart(2, '0')
                ).map((minute) => (
                  <div
                    key={minute}
                    className={`${styles.dropdownItem} ${selectedMinute === minute ? styles.selected : ''}`}
                    onClick={() => setSelectedMinute(minute)}
                  >
                    {minute}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className={styles.confirmButton}
            onClick={handleTimeSelect}
            disabled={selectedHour === '--' || selectedMinute === '--'}
          >
            Confirm
          </button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {timezoneList.length > 0 && (
        <div className={styles.timezonePickerContainer}>
          <div className={styles.timeZone}>{selectedTimezone?.displayName}</div>
          {isTimezoneDropdownOpen && (
            <div className={styles.timezoneDropDown}>
              {timezoneList.map((zone) => (
                <div
                  key={zone.id}
                  className={styles.timezoneItem}
                  onClick={() => {
                    handleTimezoneChange(zone.id);
                    setIsTimezoneDropdownOpen(false);
                  }}
                >
                  {zone.displayName}
                </div>
              ))}
            </div>
          )}
          <div
            className={styles.changeButton}
            onClick={() => setIsTimezoneDropdownOpen(true)}
          >
            Change Timezone
          </div>
        </div>
      )}
    </div>
  );
};

CustomTimePicker.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onTimeChange: PropTypes.func,
  error: PropTypes.string,
  timezoneList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTimezone: PropTypes.object.isRequired,
  handleTimezoneChange: PropTypes.func,
};

export default CustomTimePicker;
