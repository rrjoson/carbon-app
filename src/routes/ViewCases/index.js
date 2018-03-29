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
  }

  render() {
    const {
      dispatch,
      cases,
      clients,
      engineers,
    } = this.props;

    return (
      <div className={styles.viewCases}>
        <ViewCasesHeader />
        <ViewCasesFilter
          onFilterCases={data => dispatch({ type: 'cases/FETCH_CASES_BY_FITLER', payload: data })}
          clients={clients}
          engineers={engineers}
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
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
