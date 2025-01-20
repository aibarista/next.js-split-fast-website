import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({
  children,
  title,
  linkUrl,
  linkName,
  showLink = true,
}) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHolder}>
        <div className={styles.heading}>
          <h1 className="heading1">{title}</h1>
          {showLink && (
            <Link className="link" to={linkUrl}>
              {linkName}
            </Link>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  linkUrl: PropTypes.string,
  linkName: PropTypes.string,
  showLink: PropTypes.bool,
};

export default DashboardLayout;
