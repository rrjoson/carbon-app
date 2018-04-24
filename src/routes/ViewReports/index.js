import React, { Component } from 'react';
import { connect } from 'dva';

import ViewReportsFilter from './ViewReportsFilter';
import ViewReportsHeader from './ViewReportsHeader';

import ViewReportsTotalCasesOpen from './ViewReportsTotalCasesOpen';
import ViewReportsTotalCasesResolved from './ViewReportsTotalCasesResolved';
import ViewReportsSEUtilization from './ViewReportsSEUtilization';
import ViewReportsProductUtilization from './ViewReportsProductUtilization';

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

    dispatch({ type: 'reports/FETCH_MOST_CASE_CLIENT_COUNT' });
    dispatch({ type: 'reports/FETCH_AVERAGE_TURNAROUND' });
    dispatch({ type: 'reports/FETCH_TOTAL_CASES' });
    dispatch({ type: 'reports/FETCH_VENDOR_CASE_COUNT' });
    dispatch({ type: 'reports/FETCH_ENGINEER_ACTIVITIES_COUNT' });
    dispatch({ type: 'reports/FETCH_SEVERITY_COUNT' });
    dispatch({ type: 'reports/FETCH_TOTAL_CASES_COUNT' });
    dispatch({ type: 'reports/FETCH_CASE_PRODUCT_COUNT_MOST' });



    // dispatch({ type: 'reports/FETCH_OPEN_CASE_CLIENT_COUNT' });
    // dispatch({ type: 'reports/FETCH_RESOLVED_CASE_CLIENT_COUNT' });
    // dispatch({ type: 'reports/FETCH_CASE_PRODUCT_COUNT' });
    // dispatch({ type: 'reports/FETCH_VENDOR_LICENSE_COUNT' });

    dispatch({ type: 'clients/FETCH_CLIENTS' });
  }

  render() {
    const {
      dispatch,
      mostCasesClientCount,
      averageTurnaround,
      totalCases,
      totalCasesCount,
      severityCount,
      vendorCaseCount,
      caseProductCountMost,
      engineerActivitiesCount,
      clients,
      filters,
    } = this.props;

    return (
      <div>
        <section>
          <ViewReportsFilter
            filters={filters}
            clients={clients}
            onFilter={data => dispatch({ type: 'reports/FETCH_REPORTS_BY_FILTER', payload: data })}
            onResetFilters={() => dispatch({ type: 'reports/FETCH_REPORTS' })}
          />
        </section>

        <section>
          <ViewReportsHeader
            filters={filters}
          />
        </section>

        <Choose>
          <When condition={filters && filters.customer && filters.customer.length}>
            <section>
              <ViewReportsTotalCasesOpen data={mostCasesClientCount} />
              <ViewReportsTotalCasesResolved data={caseProductCountMost} />
              <ViewReportsTurnaround data={averageTurnaround} />
            </section>
            <section>
              <ViewReportsCases data={totalCases} />
              <ViewReportsSEUtilization data={engineerActivitiesCount} />
              <ViewReportsProductUtilization data={engineerActivitiesCount} />
            </section>
            <section>
              <ViewReportsSeverity
                severityCount={severityCount}
                totalCasesCount={totalCasesCount}
              />
            </section>
          </When>

          <Otherwise>
            <section>
              <ViewReportsClient data={mostCasesClientCount} />
              <ViewReportsProduct data={caseProductCountMost} />
              <ViewReportsTurnaround data={averageTurnaround} />
            </section>
            <section>
              <ViewReportsCases data={totalCases} />
              <ViewReportsSolution data={vendorCaseCount} />
            </section>
            <section>
              <ViewReportsSE data={engineerActivitiesCount} />
              <ViewReportsSeverity
                severityCount={severityCount}
                totalCasesCount={totalCasesCount}
              />
            </section>
          </Otherwise>
        </Choose>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reports: state.reports,
    mostCasesClientCount: state.reports.mostCasesClientCount,
    averageTurnaround: state.reports.averageTurnaround,
    totalCases: state.reports.totalCases,
    totalCasesCount: state.reports.totalCasesCount,
    vendorCaseCount: state.reports.vendorCaseCount,
    severityCount: state.reports.severityCount,
    caseProductCountMost: state.reports.caseProductCountMost,
    engineerActivitiesCount: state.reports.engineerActivitiesCount,
    clients: state.clients.data,
    filters: state.reports.filters,
  };
}

Dashboard.propTypes = {};

export default connect(mapStateToProps)(Dashboard);
