import React, { Component } from 'react';
import { connect } from 'dva';

import DashboardHeader from './DashboardHeader';
import DashboardTable from './DashboardTable';

import styles from './styles.css';

class Dashboard extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'cases/FETCH_CASES_BY_SEVERITY', payload: 1 });
    dispatch({ type: 'cases/FETCH_CASES_BY_SEVERITY', payload: 2 });
    dispatch({ type: 'cases/FETCH_CASES_BY_SEVERITY', payload: 3 });
    dispatch({ type: 'cases/FETCH_CASES_BY_SEVERITY', payload: 4 });
  }

  render() {
    const {
      emergency,
      critical,
      major,
      minor,
    } = this.props;

    return (
      <div className={styles.dashboard}>
        <DashboardHeader>Severity 1 - Emergency</DashboardHeader>
        <DashboardTable data={emergency} />

        <DashboardHeader>Severity 2 - Critical</DashboardHeader>
        <DashboardTable data={critical} />

        <DashboardHeader>Severity 3 - Major</DashboardHeader>
        <DashboardTable data={major} />

        <DashboardHeader>Severity 4 - Minor</DashboardHeader>
        <DashboardTable data={minor} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    emergency: state.cases.list[0],
    critical: state.cases.list[1],
    major: state.cases.list[2],
    minor: state.cases.list[3],
  };
}

Dashboard.propTypes = {};

export default connect(mapStateToProps)(Dashboard);
