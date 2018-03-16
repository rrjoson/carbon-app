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
  }

  render() {
    const {
      cases,
    } = this.props;

    if (!cases.length) return null;

    return (
      <div className={styles.viewCases}>
        <ViewCasesHeader />
        <ViewCasesFilter />
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
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
