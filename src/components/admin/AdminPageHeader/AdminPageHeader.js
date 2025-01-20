import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminPageHeader.module.css';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

const AdminPageHeader = ({
  title,
  name,
  showNumber = true,
  numberText,
  number,
  buttonLabel,
  buttonStyle,
  handleButton,
  style,
}) => {
  return (
    <div className={styles.pageHeadingWrapper} style={style}>
      <div className={styles.pageHeading}>
        {title ? title : `${name}s`}
        {showNumber ? (
          <span>
            {numberText
              ? numberText
              : number
                ? `${number} ${number > 1 ? `${name}s` : name}`
                : `No ${name}`}
          </span>
        ) : null}
      </div>
      {handleButton ? (
        <CustomButton
          onClick={handleButton}
          style={
            buttonStyle
              ? {
                  ...defaultButtonStyle,
                  ...buttonStyle,
                }
              : {
                  ...defaultButtonStyle,
                  marginBottom: 0,
                  fontSize: 14,
                  padding: '12px 19px 12px 27px',
                  height: 'unset',
                }
          }
        >
          {buttonLabel}
        </CustomButton>
      ) : null}
    </div>
  );
};

AdminPageHeader.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  showNumber: PropTypes.bool,
  numberText: PropTypes.string,
  number: PropTypes.number,
  buttonLabel: PropTypes.string,
  buttonStyle: PropTypes.object,
  handleButton: PropTypes.func,
  style: PropTypes.object,
};

export default AdminPageHeader;
