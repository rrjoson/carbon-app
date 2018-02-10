import React from 'react';
// import PropTypes from 'prop-types';

import { Card, Col, Row, Progress } from 'antd';

import DashboardTable from './components/DashboardTable';
import { Typography, Link } from './../../components';

import styles from './styles.css';

const { H1, H2, H3, H4 } = Typography;

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Row gutter={16}>
        <Col span={8}>
          <Card style={{ marginBottom: '20px' }}>
            <Row type="flex" justify="center">
              <Progress
                strokeWidth={4}
                width={208}
                type="circle"
                percent={24}
                format={
                  (percent) => {
                    return (
                      <Row>
                        <H1>{percent}</H1>
                        <H4>RESOLVED CASES</H4>
                      </Row>
                    );
                  }
                }
              />
            </Row>
            <Row gutter={16} type="flex" justify="center">
              <Col span={12}>
                <Row type="flex" justify="center">
                  <H2>76</H2>
                </Row>
                <Row type="flex" justify="center">
                  <H4>OPEN CASES</H4>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="center">
                  <H2>100</H2>
                </Row>
                <Row type="flex" justify="center">
                  <H4>TOTAL CASES</H4>
                </Row>
              </Col>
            </Row>
          </Card>
          <Card style={{ marginBottom: '20px' }} bordered={false}>
            <Row>
              <H1>16</H1>
            </Row>
            <Row>
              <H3>CASES OVERDUE</H3>
            </Row>
          </Card>
          <Card style={{ marginBottom: '20px' }} bordered={false}>
            <Row>
              <H1>12</H1>
            </Row>
            <Row>
              <H3>CASES RESOLVED THIS WEEK</H3>
            </Row>
            <Row type="flex" justify="end">
              <hr />
              <Link>View More</Link>
            </Row>
          </Card>
        </Col>
        <Col span={16}>
          <Card style={{ padding: '0' }}>
            <DashboardTable />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
