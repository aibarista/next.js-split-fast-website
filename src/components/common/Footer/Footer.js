import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.css';
import routes from 'routes';

const footerLinks = [
  {
    url: routes.client.home,
    text: 'Link',
  },
  {
    url: routes.client.home,
    text: 'Link',
  },
  {
    url: routes.client.home,
    text: 'Link',
  },
];

const Footer = () => {
  return (
    <div className={styles.hpFooter}>
      <div className={styles.hpFsectionWrapper}>
        <div className={styles.hpFText}>
          Copyright © 2024-2025 Splitfast. All rights reserved.
        </div>
        <div className={styles.footerLinkWrapper}>
          {footerLinks.map((link, index) => (
            <Link to={link.url} key={index} className={styles.footerLink}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
