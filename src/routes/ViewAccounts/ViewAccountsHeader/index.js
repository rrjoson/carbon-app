import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Link, Button, RestrictedComponent } from './../../../components';

import styles from './styles.css';

const { H2 } = Typography;

function DashboardHeader(props) {
  const { type } = props;

  if (type === 'administrator') {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <H2>Administrator</H2>
        </div>
        <RestrictedComponent action="ADD_USER">
          <div>
            <Link to="/accounts/add">
              <Button className={styles.button}>New Account</Button>
            </Link>
          </div>
        </RestrictedComponent>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <H2>Glo-cal Employees</H2>
      </div>
    </div>
  );
}

DashboardHeader.propTypes = {};

export default DashboardHeader;
