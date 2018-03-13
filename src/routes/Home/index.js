import React from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';

import { Col, Row } from 'antd';

import HomeTable from './HomeTable';
import HomeStats from './HomeStats';
import HomeHeader from './HomeHeader';
import HomeFilter from './HomeFilter';

import styles from './styles.css';

function Dashboard(props) {
  const {
    cases
  } = props;

  return (
    <div className={styles.dashboard}>
      <HomeHeader />
      <HomeFilter />
      <HomeTable
        data={cases}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cases: state.cases.data,
  };
}

Dashboard.propTypes = {};

export default connect(mapStateToProps)(Dashboard);
