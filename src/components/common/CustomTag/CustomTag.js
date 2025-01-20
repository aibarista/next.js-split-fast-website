import React from 'react';
import styles from './CustomTag.module.css';

import { ReactComponent as CloseIcon } from 'assets/images/icon_close.svg';

const CustomTag = () => {
  const [tags, setTags] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <>
      <div>
        <div className={styles.clubDisciplinesTitle}>My Disciplines</div>
        <div className={styles.clubDisciplines}>
          {tags.map((tag, index) => (
            <div key={index} className={styles.clubDiscipline}>
              <div className={styles.clubDisciplineText}>{tag}</div>
              <div className={styles.crossImage} onClick={() => removeTag(tag)}>
                <CloseIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.createNew}>
        <input
          type="text"
          placeholder="+ Add new discipline tag (type and press enter)"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
      </div>
    </>
  );
};

export default CustomTag;
