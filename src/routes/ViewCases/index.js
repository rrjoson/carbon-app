import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import ViewCasesHeader from './ViewCasesHeader';
import ViewCasesFilter from './ViewCasesFilter';
import ViewCasesTable from './ViewCasesTable';

class ViewCases extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'cases/FETCH_ALL_CASES', payload: match.params.caseId });
    dispatch({ type: 'clients/FETCH_CLIENTS' });
    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
    dispatch({ type: 'vendors/FETCH_VENDORS' });
  }

  render() {
    const {
      dispatch,
      cases,
      clients,
      engineers,
      vendors,
    } = this.props;

    return (
      <div className={styles.viewCases}>
        <ViewCasesHeader />
        <ViewCasesFilter
          onFilterCases={data => dispatch({ type: 'cases/FETCH_CASES_BY_FITLER', payload: data })}
          clients={clients}
          engineers={engineers}
          vendors={vendors}
        />
        <ViewCasesTable
          data={cases}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cases: state.cases.data,
    clients: state.clients.data,
    engineers: state.engineers.data,
    vendors: state.vendors.data,
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
