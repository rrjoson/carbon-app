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
    } = this.props;

    dispatch({ type: 'cases/FETCH_ALL_CASES' });
    dispatch({ type: 'clients/FETCH_CLIENTS' });
    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
    dispatch({ type: 'vendors/FETCH_VENDORS' });
    dispatch({ type: 'products/FETCH_PRODUCTS' });
  }

  render() {
    const {
      dispatch,
      cases,
      filters,
      clients,
      engineers,
      vendors,
      products,
    } = this.props;

    return (
      <div className={styles.dashboard}>
        <HomeHeader />
        <HomeFilter
          onFilterCases={data => dispatch({ type: 'cases/FETCH_CASES_BY_FITLER', payload: data })}
          onResetFilters={() => dispatch({ type: 'cases/RESET_FILTERS' })}
          filters={filters}
          clients={clients}
          engineers={engineers}
          vendors={vendors}
          products={products}
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
    filters: state.cases.filters,
    clients: state.clients.data,
    engineers: state.engineers.data,
    vendors: state.vendors.data,
    products: state.products.data,
  };
}

Home.propTypes = {};

export default connect(mapStateToProps)(Home);
