import React from 'react';
// import PropTypes from 'prop-types';

import { Col, Row, Progress } from 'antd';

import { Typography, Link, Card } from './../../../components';

import styles from './styles.css';

const { H1, H2, H4, H5 } = Typography;

function HomeStats(props) {
  return (
    <div>
      <Card style={{ marginBottom: '20px' }}>
        <Row type="flex" justify="center">
          <Progress
            style={{ marginBottom: '30px' }}
            strokeWidth={4}
            width={208}
            type="circle"
            percent={24}
            format={
              (percent) => {
                return (
                  <Row>
                    <Row>
                      <H1>{percent}</H1>
                    </Row>
                    <Row>
                      <H5>RESOLVED CASES</H5>
                    </Row>
                  </Row>
                );
              }
            }
          />
        </Row>
        <Row gutter={16} type="flex" justify="center">
          <Col span={12} className={styles.verticalLine}>
            <Row type="flex" justify="center">
              <H2>76</H2>
            </Row>
            <Row type="flex" justify="center">
              <H5>OPEN CASES</H5>
            </Row>
          </Col>
          <Col span={12}>
            <Row type="flex" justify="center">
              <H2>100</H2>
            </Row>
            <Row type="flex" justify="center">
              <H5>TOTAL CASES</H5>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginBottom: '20px' }}>
        <Row>
          <H1>16</H1>
        </Row>
        <Row>
          <H4>CASES OVERDUE</H4>
        </Row>
        <div className={styles.horizontalLine} />
        <Row type="flex" justify="end">
          <Link to="/">View More</Link>
        </Row>
      </Card>
      <Card style={{ marginBottom: '20px' }}>
        <Row>
          <H1>12</H1>
        </Row>
        <Row>
          <H4>CASES RESOLVED THIS WEEK</H4>
        </Row>
        <div className={styles.horizontalLine} />
        <Row type="flex" justify="end">
          <Link to="/">View More</Link>
        </Row>
      </Card>
    </div>
  );
}

HomeStats.propTypes = {};

export default HomeStats;
