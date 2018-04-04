import React from 'react';
// import PropTypes from 'prop-types';

import { Button } from 'antd';
import { Link, Typography, Restricted } from './../../../components';

import styles from './styles.css';

const { H2 } = Typography;

function HomeHeader(props) {
  return (
    <div className={styles.homeHeader}>
      <div className={styles.title}>
        <H2>My Cases</H2>
      </div>
      <Restricted action="ADD_CASE">
        <div>
          <Link to="/cases/add">
            <Button className={styles.button}>New Case</Button>
          </Link>
        </div>
      </Restricted>
    </div>
  );
}

HomeHeader.propTypes = {};

export default HomeHeader;
