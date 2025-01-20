import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import LogoImage from 'assets/images/logo.png';
import { URL } from 'constants/auth';

const MetaTags = ({
  title,
  description = 'All-in-One Solution for Competition Scheduling, Real-Time Results, and Athlete Performance Management',
  keywords = 'SplitFast',
  image = LogoImage,
  url = `${URL}`,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default MetaTags;
