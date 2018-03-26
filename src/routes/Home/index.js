import React, { Component } from 'react';
import { connect } from 'dva';

import HomeTable from './HomeTable';
import HomeHeader from './HomeHeader';
import HomeFilter from './HomeFilter';

import styles from './styles.css';

class Home extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'cases/FETCH_ALL_CASES', payload: match.params.caseId });
    dispatch({ type: 'clients/FETCH_CLIENTS' });
  }

  render() {
    const {
      dispatch,
      cases,
      clients,
    } = this.props;

    if (
      !cases.length ||
      !clients.length
    ) return null;

    return (
      <div className={styles.dashboard}>
        <HomeHeader />
        <HomeFilter
          onFilterCases={data => dispatch({ type: 'cases/FETCH_CASES_BY_FITLER', payload: data })}
          clients={clients}
        />
        <HomeTable
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
  };
}

Home.propTypes = {};

export default connect(mapStateToProps)(Home);
