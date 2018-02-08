import React from 'react';
import { Card as AntCard } from 'antd';
import styles from './styles.css';

const Card = (props) => {
  return <AntCard {...props} className={styles.card}>{props.children}</AntCard>;
};

export default Card;
