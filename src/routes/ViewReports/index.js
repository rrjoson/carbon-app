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

    dispatch({ type: 'reports/FETCH_REPORTS' });
    dispatch({ type: 'clients/FETCH_CLIENTS' });
    dispatch({ type: 'reports/FETCH_TOTAL_CASES_COUNT' });
  }

  render() {
    const {
      dispatch,
      clientWithMostCases,
      productWithMostCases,
      averageTurnaroundTime,
      totalCases,
      totalCasesCount,
      severityCount,
      vendorCaseCount,
      engineerActivitiesCount,
      caseProductCount,
      openCaseClientCount,
      resolvedCaseClientCount,
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
              <ViewReportsTotalCasesOpen data={openCaseClientCount} />
              <ViewReportsTotalCasesResolved data={resolvedCaseClientCount} />
              <ViewReportsTurnaround data={averageTurnaroundTime} />
            </section>
            <section>
              <ViewReportsCases data={totalCases} />
              <ViewReportsSEUtilization data={engineerActivitiesCount} />
              <ViewReportsProductUtilization data={caseProductCount} />
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
              <ViewReportsClient data={clientWithMostCases} />
              <ViewReportsProduct data={productWithMostCases} />
              <ViewReportsTurnaround data={averageTurnaroundTime} />
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
    clientWithMostCases: state.reports.clientWithMostCases,
    productWithMostCases: state.reports.productWithMostCases,
    averageTurnaroundTime: state.reports.averageTurnaroundTime,
    totalCases: state.reports.totalCases,
    totalCasesCount: state.reports.totalCasesCount,
    vendorCaseCount: state.reports.vendorCaseCount,
    severityCount: state.reports.severityCount,
    caseProductCount: state.reports.caseProductCount,
    resolvedCaseClientCount: state.reports.resolvedCaseClientCount,
    engineerActivitiesCount: state.reports.engineerActivitiesCount,
    openCaseClientCount: state.reports.openCaseClientCount,
    clients: state.clients.data,
    filters: state.reports.filters,
  };
}

Dashboard.propTypes = {};

export default connect(mapStateToProps)(Dashboard);
