import React from 'react';
import styles from './styles.css';
import { Button } from 'antd';

import { Typography } from './../../../components';

const { H2 } = Typography;

function ViewCasesHeader(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H2>SE List</H2>
      </div>
    </div>
  );
}

ViewCasesHeader.propTypes = {};

export default ViewCasesHeader;
