import React, { Component } from 'react';
import { connect } from 'dva';

import ViewReportsClient from './ViewReportsClient';
import ViewReportsProduct from './ViewReportsProduct';
import ViewReportsTurnaround from './ViewReportsTurnaround';

import ViewReportsCases from './ViewReportsCases';
import ViewReportsSolution from './ViewReportsSolution';

import ViewReportsSE from './ViewReportsSE';
import ViewReportsSeverity from './ViewReportsSeverity';

import styles from './styles.css';

class Dashboard extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    // dispatch({ type: 'reports/FETCH_TOTAL_CASES' });
    // dispatch({ type: 'reports/FETCH_SEVERITY_COUNT' });
    // dispatch({ type: 'reports/FETCH_ENGINEER_ACTIVITIES_COUNT' });
    dispatch({ type: 'reports/FETCH_MOST_CASE_CLIENT_COUNT' });
    dispatch({ type: 'reports/FETCH_AVERAGE_TURNAROUND' });
    // dispatch({ type: 'reports/FETCH_OPEN_CASE_CLIENT_COUNT' });
    // dispatch({ type: 'reports/FETCH_RESOLVED_CASE_CLIENT_COUNT' });
    // dispatch({ type: 'reports/FETCH_CASE_PRODUCT_COUNT' });
    // dispatch({ type: 'reports/FETCH_VENDOR_CASE_COUNT' });
    // dispatch({ type: 'reports/FETCH_VENDOR_LICENSE_COUNT' });
  }

  render() {
    const {
      dispatch,
      reports,
      mostCasesClientCount,
      averageTurnaround,
    } = this.props;

    console.warn(reports)

    return (
      <div>
        <section>
          <ViewReportsClient data={mostCasesClientCount} />
          <ViewReportsProduct />
          <ViewReportsTurnaround data={averageTurnaround} />
        </section>
        <section>
          <ViewReportsCases />
          <ViewReportsSolution />
        </section>
        <section>
          <ViewReportsSE />
          <ViewReportsSeverity />
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reports: state.reports,
    mostCasesClientCount: state.reports.mostCasesClientCount,
    averageTurnaround: state.reports.averageTurnaround,
  };
}

Dashboard.propTypes = {};

export default connect(mapStateToProps)(Dashboard);
