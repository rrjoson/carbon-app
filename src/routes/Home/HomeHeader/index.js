import React from 'react';
// import PropTypes from 'prop-types';

import { Row, Button } from 'antd';
import { Link, Typography } from './../../../components';

import styles from './styles.css';

const { H2 } = Typography;

function HomeHeader(props) {
  return (
    <div className={styles.homeHeader}>
      <div className={styles.title}>
        <H2>My Cases</H2>
      </div>
      <div>
        <Link to="/cases/add">
          <Button className={styles.button}>New Case</Button>
        </Link>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cases: state.cases.data,
  };
}

HomeHeader.propTypes = {};

export default HomeHeader;
