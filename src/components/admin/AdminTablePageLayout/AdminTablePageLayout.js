import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminTablePageLayout.module.css';
import Loading from 'components/common/Loading';

const AdminTablePageLayout = ({ loading, children }) => {
  return (
    <div className={styles.page}>
      {loading ? (
        <Loading isLoadingAdminPage={true} />
      ) : (
        <div className={styles.pageWrapper}>{children}</div>
      )}
    </div>
  );
};

AdminTablePageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

export default AdminTablePageLayout;
