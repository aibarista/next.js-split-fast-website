import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './AdminBlock.module.css';

const AdminBlock = ({ children, title, url }) => {
  return (
    <div className={styles.adminBlockContainer}>
      <div className={styles.adminBlockHeader}>
        <h2 className={`${styles.adminBlockTitle} heading2`}>{title}</h2>
        {url ? (
          <Link to={url} className="link">
            See All
          </Link>
        ) : null}
      </div>
      {children}
    </div>
  );
};

AdminBlock.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
};

export default AdminBlock;
