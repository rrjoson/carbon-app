import React from 'react';
import styles from './styles.css';
import { Button } from 'antd';

import { Typography, Link } from './../../../components';

const { H2 } = Typography;

function ViewCasesHeader(props) {
  return (
    <div className={styles.allCasesHeader}>
      <div className={styles.title}>
        <H2>Glocal Cases</H2>
      </div>
      <div>
        <Link to="/cases/add">
          <Button className={styles.button}>Add Case</Button>
        </Link>
      </div>
    </div>
  );
}

ViewCasesHeader.propTypes = {};

export default ViewCasesHeader;
