import React from 'react';
// import PropTypes from 'prop-types';

import { Button } from 'antd';
import { Link, Typography, RestrictedComponent } from './../../../../components';

import styles from './styles.css';

const { H2 } = Typography;

function HomeHeader(props) {
  return (
    <div className={styles.homeHeader}>
      <div className={styles.title}>
        <H2>My Cases</H2>
      </div>
      <RestrictedComponent action="ADD_CASE">
        <div>
          <Link to="/cases/add">
            <Button className={styles.button}>New Case</Button>
          </Link>
        </div>
      </RestrictedComponent>
    </div>
  );
}

HomeHeader.propTypes = {};

export default HomeHeader;
