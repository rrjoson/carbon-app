import React from 'react';
import { Icon } from 'antd';

import styles from './styles.css';

import { H3 } from './../../components/Typography';

const Error = () => (
  <div className={styles.error}>
    <Icon type="frown-o" style={{ fontSize: 50 }} />
    <H3>404 - Page not found</H3>
  </div>
);

export default Error;
