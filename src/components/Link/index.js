import React from 'react';
import { Link as DvaLink } from 'dva/router';
import styles from './styles.css';

const Link = (props) => {
  return <DvaLink {...props} className={styles.link}>{props.children}</DvaLink>;
};

export default Link;
