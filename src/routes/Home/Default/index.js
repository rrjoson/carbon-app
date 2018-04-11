import React, { Component } from 'react';
import { connect } from 'dva';

import DefaultTable from './DefaultTable';
import DefaultHeader from './DefaultHeader';
import DefaultFilter from './DefaultFilter';

import styles from './styles.css';

class Default extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'cases/FETCH_CASES_OF_LOGGED_IN_USER' });
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
        <DefaultHeader />
        <DefaultFilter
          onFilterCases={data => dispatch({ type: 'cases/FETCH_CASES_OF_LOGGED_IN_USER_BY_FITLER', payload: data })}
          onResetFilters={() => dispatch({ type: 'cases/RESET_FILTERS_OF_CASES_OF_LOGGED_IN_USER' })}
          onRemoveFilter={data => dispatch({ type: 'cases/REMOVE_FILTER_OF_CASES_OF_LOGGED_IN_USER', payload: data })}
          onSelectVendor={data => dispatch({ type: 'products/FETCH_PRODUCTS_OF_VENDOR', payload: data })}
          filters={filters}
          clients={clients}
          engineers={engineers}
          vendors={vendors}
          products={products}
        />
        <DefaultTable
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

Default.propTypes = {};

export default connect(mapStateToProps)(Default);
