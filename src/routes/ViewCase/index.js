import React, { Component } from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';

import { Col, Row, Progress } from 'antd';

import DashboardTable from './components/DashboardTable';
import SelectStatus from './components/SelectStatus';
import Activities from './components/Activities';
import { Typography, Link, Card, Button } from './../../components';

import styles from './styles.css';

const { H1, H2, H3, H4 } = Typography;

class ViewCase extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'cases/FETCH_CASE', payload: match.params.caseId });
  }

  render() {
    const {
      selectedCase,
    } = this.props;

    if (!selectedCase) return null;

    console.warn(selectedCase)

    return (
      <div className={styles.viewCase}>
        <Row>
          <H2>SF VVR Uninstall activity</H2>
          <Link to={`/cases/${selectedCase.glocalid}/activities/add`}><Button>Add Activity</Button></Link>
          <Button>Edit Case</Button>
        </Row>
        <Row>
          Install new stuff
        </Row>
        <Row>
          <DashboardTable data={[selectedCase]} />
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
}

function mapStateToProps(state) {
  return {
    selectedCase: state.cases.selected,
  };
}

ViewCase.propTypes = {};

export default connect(mapStateToProps)(ViewCase);


