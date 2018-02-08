import React from 'react';
import { Button as AntButton } from 'antd';

import styles from './styles.css';

const Button = (props) => {
  return <AntButton {...props} className={styles.button}>{props.children}</AntButton>;
};

export default Button;
