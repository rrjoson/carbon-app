import React from 'react';
import { Icon } from 'antd';

import styles from './styles.css';

const Error = () => (
  <div className={styles.error}>
    <Icon type="frown-o" />
    <h1>404 Not Found</h1>
  </div>
);

export default Error;
