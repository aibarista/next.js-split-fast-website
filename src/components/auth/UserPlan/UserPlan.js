import React from 'react';
import PropsType from 'prop-types';
import styles from './UserPlan.module.css';

const UserPlan = ({ selectedId, id, onClick }) => {
  return (
    <div
      className={`${styles.sectionItem} ${selectedId === id ? styles.sectionItemActive : ''}`}
      onClick={onClick}
    >
      <span>What are the plans?</span>
    </div>
  );
};

UserPlan.prototype = {
  selectedId: PropsType.any,
  id: PropsType.any,
  onClick: PropsType.func,
};

export default UserPlan;
