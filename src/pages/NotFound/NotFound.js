import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import routes from 'routes';
import MetaTags from 'components/common/MetaTags';

const NotFound = () => (
  <>
    <MetaTags title="SplitFast | 404" />
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link className={styles.button} to={routes.admin.dashboard}>
        Go back to the dashboard
      </Link>
    </div>
  </>
);

export default NotFound;
