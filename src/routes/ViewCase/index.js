import React from 'react';
// import PropTypes from 'prop-types';

import { Col, Row, Progress } from 'antd';

import DashboardTable from './components/DashboardTable';
import SelectStatus from './components/SelectStatus';
import Activities from './components/Activities';
import { Typography, Link, Card, Button } from './../../components';

import styles from './styles.css';

const { H1, H2, H3, H4 } = Typography;

function Dashboard() {
  return (
    <div className={styles.viewCase}>
      <Row>
        <H2>SF VVR Uninstall activity</H2>
        <Button>Add Activity</Button>
        <Button>Edit Case</Button>
      </Row>
      <Row>
        Install new stuff
      </Row>
      <Row>
        <DashboardTable />
      </Row>
      <Row>
        <SelectStatus />
      </Row>
      <Row>
        <Activities />
      </Row>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
