import React from 'react';
import styles from './AdminTab.module.css';
import PropTypes from 'prop-types';

const AdminTab = ({
  options = [],
  value,
  clickTab,
  clubRole,
  disabled = false,
}) => {
  return (
    <div className={`${styles.options} ${disabled ? 'disabled' : ''}`}>
      {options.map(
        (option) =>
          (!clubRole ||
            !option.allowedRoles ||
            option.allowedRoles.indexOf(clubRole) !== -1) && (
            <div
              key={option.value}
              className={`tabOption ${value === option.value ? 'active' : ''}`}
              onClick={() => clickTab(option.value)}
            >
              {option.label}
            </div>
          )
      )}
    </div>
  );
};

AdminTab.propTypes = {
  options: PropTypes.array.isRequired,
  clubRole: PropTypes.string.isRequired,
  value: PropTypes.string,
  clickTab: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AdminTab;
