import React from 'react';
import styles from './styles.css';

const Link = (props) => {
  return <a className={styles.link}>{props.children}</a>;
};

export default Link;
