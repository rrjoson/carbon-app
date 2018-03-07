import React from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';

import { Col, Row } from 'antd';

import HomeTable from './HomeTable';
import HomeStats from './HomeStats';
import HomeTableHeader from './HomeTableHeader';

import styles from './styles.css';

function Dashboard(props) {
  const {
    cases
  } = props;

  return (
    <div className={styles.dashboard}>
      <Row gutter={16}>
        <Col span={6}>
          <HomeStats />
        </Col>
        <Col span={18}>
          <HomeTableHeader />
          <HomeTable data={cases} />
        </Col>
      </Row>
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
