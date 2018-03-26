import React from 'react';
import styles from './styles.css';

import { Typography } from './../../../components';

const { H2 } = Typography;

function ViewEngineerHeader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H2>Oliver’s Activities</H2>
      </div>
    </div>
  );
}

ViewEngineerHeader.propTypes = {};

export default ViewEngineerHeader;
