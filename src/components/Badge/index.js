import React from 'react';
import styles from './styles.css';

const Badge = (props) => {
  return <span {...props} className={styles.badge}>{props.children}</span>;
};

export default Badge;
