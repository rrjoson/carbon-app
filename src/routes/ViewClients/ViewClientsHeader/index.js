import React from 'react';
import styles from './styles.css';
import { Button } from 'antd';

import { Typography, Link } from './../../../components';

const { H2 } = Typography;

function ViewCasesHeader(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H2>Glocal Cases</H2>
      </div>
      <div>
        <Link to="/clients/add">
          <Button className={styles.button}>New Client</Button>
        </Link>
      </div>
    </div>
  );
}

ViewCasesHeader.propTypes = {};

export default ViewCasesHeader;
