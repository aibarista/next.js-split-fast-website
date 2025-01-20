import React from 'react';
import styles from './ProfileContact.module.css';

import SelectImage from 'assets/images/select.png';

const ProfileContact = () => {
  return (
    <div className={styles.contactsWrapper}>
      <div className={styles.contactHeading}>My Contacts</div>
      <div className={styles.contactsOverflow}>
        <div className={styles.contacts}>
          <div className={styles.contact}>
            <div className={styles.contactName}>
              <label htmlFor="contactName1">Name</label>
              <input
                type="text"
                id="contactName1"
                placeholder="Angela Morales"
              />
            </div>
            <div className={styles.contactRelation}>
              <label htmlFor="contactRelation1">Relationship</label>
              <div className={styles.input_wrapper}>
                <select id="contactRelation1">
                  <option value="Spouse">Spouse</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                </select>
                <img
                  src={SelectImage}
                  className={styles.selectImage}
                  alt="png"
                />
              </div>
            </div>
            <div className={styles.contactName}>
              <label htmlFor="contactPhone1">Phone</label>
              <input type="text" id="contactPhone1" placeholder="[number]" />
            </div>
          </div>
          <div className={styles.contact}>
            <div className={styles.contactName}>
              <label htmlFor="contactName1">Name</label>
              <input
                type="text"
                id="contactName1"
                placeholder="María Morales"
              />
            </div>
            <div className={styles.contactRelation}>
              <label htmlFor="contactRelation1">Relationship</label>
              <div className={styles.input_wrapper}>
                <select id="contactRelation1">
                  <option value="Spouse">Spouse</option>
                  <option value="Mother" selected>
                    Mother
                  </option>
                  <option value="Father">Father</option>
                </select>
                <img
                  src={SelectImage}
                  className={styles.selectImage}
                  alt="png"
                />
              </div>
            </div>
            <div className={styles.contactName}>
              <label htmlFor="contactPhone1">Phone</label>
              <input type="text" id="contactPhone1" placeholder="[number]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContact;
