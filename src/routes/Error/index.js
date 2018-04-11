import React from 'react';
import { Icon } from 'antd';

import styles from './styles.css';

import notFound from '../../assets/not-found.svg';

import { H1, H4 } from './../../components/Typography';
import Button from './../../components/Button';

const Error = () => (
  <div className={styles.error}>
    <img className={styles.image} src={notFound} />
    <div className={styles.text}>
      <H1>404</H1>
      <H4>Sorry, the page you are looking for could not be found.</H4>
    </div>
  </div>
);

export default Error;
