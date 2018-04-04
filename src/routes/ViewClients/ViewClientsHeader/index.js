import React from 'react';
import styles from './styles.css';
import { Button } from 'antd';

import { Typography, Link, RestrictedComponent } from './../../../components';

const { H2 } = Typography;

function ViewCasesHeader(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H2>Clients</H2>
      </div>
      <RestrictedComponent action="ADD_CLIENT">
        <div>
          <Link to="/clients/add">
            <Button className={styles.button}>New Client</Button>
          </Link>
        </div>
      </RestrictedComponent>
    </div>
  );
}

ViewCasesHeader.propTypes = {};

export default ViewCasesHeader;
