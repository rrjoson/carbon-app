import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from './../../../components';

import styles from './styles.css';

const { H2 } = Typography;

function DashboardHeader(props) {
  const { children } = props;

  return (
    <div className={styles.dashboardHeader}>
      <div className={styles.title}>
        <H2>{children}</H2>
      </div>
    </div>
  );
}

DashboardHeader.propTypes = {};

export default DashboardHeader;
