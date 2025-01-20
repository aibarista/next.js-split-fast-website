import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { redColor, whiteColor } from 'config/global';
import IconTextButton from 'components/common/IconTextButton';
import { ReactComponent as EyeIcon } from 'assets/images/icon_eye.svg';

const TableViewButton = ({ url, style, iconSize, textFontSize }) => {
  const navigate = useNavigate();

  return (
    <IconTextButton
      text="View"
      icon={<EyeIcon />}
      onClick={() => navigate(url)}
      style={style}
      textColor={redColor}
      borderColor={whiteColor}
      height="unset"
      iconPadding="5px"
      iconColor={redColor}
      iconPosition="right"
      iconSize={iconSize}
      textStyle={{
        fontSize: textFontSize,
      }}
    />
  );
};

TableViewButton.propTypes = {
  url: PropTypes.string,
  style: PropTypes.object,
  iconSize: PropTypes.string,
  textFontSize: PropTypes.string,
};

export default TableViewButton;
