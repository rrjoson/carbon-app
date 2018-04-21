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
    dispatch({ type: 'engineers/FETCH_SE_LEADS' });
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
      leads,
      vendors,
      products,
    } = this.props;

    return (
      <div className={styles.viewCases}>
        <ViewCasesHeader />
        <ViewCasesFilter
          onFilterCases={data => dispatch({ type: 'cases/FETCH_CASES_BY_FITLER', payload: data })}
          onResetFilters={() => dispatch({ type: 'cases/RESET_FILTERS' })}
          onRemoveFilter={data => dispatch({ type: 'cases/REMOVE_FILTER', payload: data })}
          onSelectVendor={data => dispatch({ type: 'products/FETCH_PRODUCTS_OF_VENDOR', payload: data })}
          filters={filters}
          clients={clients}
          engineers={engineers}
          leads={leads}
          vendors={vendors}
          products={products}
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
    filters: state.cases.filters,
    clients: state.clients.data,
    engineers: state.engineers.data,
    leads: state.engineers.leads,
    vendors: state.vendors.data,
    products: state.products.data,
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
