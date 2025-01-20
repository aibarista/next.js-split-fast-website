import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ReadMoreText = ({ text, limit = 100, style, readMoreStyle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  if (text.length > limit) {
    return (
      <div style={style}>
        {isExpanded ? text : `${text.substring(0, limit)}... `}
        <div onClick={toggleReadMore} style={readMoreStyle}>
          {isExpanded ? 'Read less' : 'Read more'}
        </div>
      </div>
    );
  } else {
    return <div style={style}>{text}</div>;
  }
};

ReadMoreText.propTypes = {
  text: PropTypes.string,
  limit: PropTypes.number,
  style: PropTypes.object,
  readMoreStyle: PropTypes.object,
};

export default ReadMoreText;
