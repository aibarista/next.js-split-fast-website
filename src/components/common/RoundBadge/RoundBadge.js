import React from 'react';
import styles from './RoundBadge.module.css';
import PropTypes from 'prop-types';

const RoundBadge = ({
    text,
    tooltipText = "There is a new record pending", // New prop for tooltip text
    style,
    textColor,
    bgColor,
    textStyle = {
        fontSize: '12px',
    },
}) => {
    const buttonPropsStyle = {
        ...style,
        color: textColor,
        background: bgColor,
    };

    return (
        <div
            className={`${styles.badgeStyle} ${styles.tooltipContainer}`}
            style={buttonPropsStyle}
        >
            {text}
            {tooltipText && (
                <span className={styles.tooltip}>{tooltipText}</span>
            )}
        </div>
    );
};

RoundBadge.propTypes = {
    text: PropTypes.string.isRequired,
    tooltipText: PropTypes.string, // Define the tooltip text prop
    style: PropTypes.object,
    textColor: PropTypes.string,
    bgColor: PropTypes.string,
    borderColor: PropTypes.string,
    textStyle: PropTypes.object,
    textFontSize: PropTypes.string,
};

export default RoundBadge;
