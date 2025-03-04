import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminPageOption.module.css';
import CustomButton from 'components/common/CustomButton';

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
  hasImportButton = false,
  handleImportButton,
  handleExportButton,
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
          <>
            {hasImportButton && (
              <>
                <CustomButton
                  disabled={buttonDisabled}
                  style={{
                    fontWeight: 600,
                    backgroundColor: '#889398',
                    marginRight: 10,
                    color: '#fff',
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginBottom: 0,
                    height: 'auto',
                  }}
                  onClick={handleImportButton}
                >
                  Import
                </CustomButton>
                <CustomButton
                  disabled={buttonDisabled}
                  style={{
                    fontWeight: 600,
                    backgroundColor: '#889398',
                    marginRight: 10,
                    color: '#fff',
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginBottom: 0,
                    height: 'auto',
                  }}
                  onClick={handleExportButton}
                >
                  Export
                </CustomButton>
              </>
            )}
            <CustomButton
              disabled={buttonDisabled}
              style={buttonStyle}
              onClick={handleButton}
            >
              {buttonLabel}
            </CustomButton>
          </>
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
  hasImportButton: PropTypes.bool,
  handleImportButton: PropTypes.func,
  handleExportButton: PropTypes.func,
};

export default AdminPageOption;
