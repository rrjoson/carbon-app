import React from 'react';
import styles from './styles.css';
import { Button } from 'antd';

import { Typography, Link, RestrictedComponent } from './../../../components';

const { H2 } = Typography;

function ViewCasesHeader(props) {
  const { type } = props;

  if (type === 'active') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <H2>Active Licenses</H2>
        </div>
        <RestrictedComponent action="ADD_LICENSE">
          <div>
            <Link to="/licenses/add">
              <Button className={styles.button}>New License</Button>
            </Link>
          </div>
        </RestrictedComponent>
      </div>
    );
  }

  if (type === 'expired') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <H2>Expired Licenses</H2>
        </div>
      </div>
    );
  }

  return null;
}

ViewCasesHeader.propTypes = {};

export default ViewCasesHeader;
