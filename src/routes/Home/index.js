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
    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
  }

  render() {
    const {
      dispatch,
      cases,
      clients,
      engineers,
    } = this.props;

    if (
      !cases.length ||
      !clients.length ||
      !engineers.length
    ) return null;

    return (
      <div className={styles.dashboard}>
        <HomeHeader />
        <HomeFilter
          onFilterCases={data => dispatch({ type: 'cases/FETCH_CASES_BY_FITLER', payload: data })}
          clients={clients}
          engineers={engineers}
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
    engineers: state.engineers.data,
  };
}

Home.propTypes = {};

export default connect(mapStateToProps)(Home);
