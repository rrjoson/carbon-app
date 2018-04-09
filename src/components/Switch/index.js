import React from 'react';
import { Switch as AntSwitch } from 'antd';
import styles from './styles.css';

function Switch(props) {
  return (
    <span className={styles.switch}>
      <AntSwitch {...props} />
    </span>
  );
}

export default Switch;
