import React from 'react';
import styles from './styles.css';

const Avatar = (props) => {
  const colors = ['#add170', '#7570d1', '#70d17c', '#d17070'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return <span {...props} style={{ backgroundColor: randomColor }} className={styles.avatar}>{props.children}</span>;
};

export default Avatar;
