import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './FindClubs.module.css';
import BackButton from 'components/auth/BackButton';

import SearchIcon from 'assets/images/icon_search.png';

const FindClubs = () => {
  const navigate = useNavigate();

  return (
    <>
      <BackButton navigate={navigate} />
      <div className={styles.findClubsContainer}>
        <div className={styles.sectionHeading}>Find your clubs</div>
        <div className={styles.inputItem}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="registerEmailAdress"
              placeholder="Start typing"
            />
            <img
              src={SearchIcon}
              className={styles.iconEyeCross}
              alt="search"
            />
          </div>
        </div>
        <div className={styles.noteText}>
          <span>Note:</span>
          The club owner(s) will need to accept your request to join before you
          will see the club in your Dashboard.
        </div>
        <a href="/login" className={styles.logIn}>
          Register
        </a>
      </div>
    </>
  );
};

export default FindClubs;
