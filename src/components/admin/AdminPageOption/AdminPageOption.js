import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminPageOption.module.css';
import CustomButton from '../../common/CustomButton';

const AdminPageOption = ({
  clubRole,
  dataTypeOptions = [],
  viewTypeOptions = [],
  optionValues,
  handleOptionChange,
  hasButton = false,
  buttonLabel,
  buttonStyle,
  handleButton,
  buttonDisabled,
}) => {
  return (
    <div className={styles.adminPageOptionWrapper}>
      <div className={styles.dataTypeOptions}>
        {dataTypeOptions.map(
          (option) =>
            (!clubRole ||
              !option.allowedRoles ||
              option.allowedRoles.indexOf(clubRole) !== -1) && (
              <div
                key={option.value}
                className={`${styles.dataTypeOption} ${optionValues['dataType'] === option.value ? styles.active : ''}`}
                onClick={() => handleOptionChange('dataType', option.value)}
              >
                {option.label}
              </div>
            )
        )}
      </div>
      <div className={styles.viewTypeOptions}>
        {hasButton ? (
          <CustomButton
            disabled={buttonDisabled}
            style={buttonStyle}
            onClick={handleButton}
          >
            {buttonLabel}
          </CustomButton>
        ) : (
          viewTypeOptions.map((option, index) => (
            <div
              key={index}
              className={`${styles.viewTypeOption} ${optionValues['viewType'] === option.value ? styles.active : ''}`}
              onClick={() => handleOptionChange('viewType', option.value)}
            >
              <div className={styles.viewTypeOptionImage}>
                <img src={option.icon} alt={option.value} />
              </div>
              <div className={styles.viewTypeOptionText}>{option.label}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

AdminPageOption.propTypes = {
  clubRole: PropTypes.string,
  dataTypeOptions: PropTypes.arrayOf(PropTypes.object),
  viewTypeOptions: PropTypes.arrayOf(PropTypes.object),
  optionValues: PropTypes.object,
  handleOptionChange: PropTypes.func,
  hasButton: PropTypes.bool,
  buttonLabel: PropTypes.string,
  buttonStyle: PropTypes.object,
  handleButton: PropTypes.func,
  buttonDisabled: PropTypes.bool,
};

export default AdminPageOption;
