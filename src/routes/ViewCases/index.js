import React, { Component } from 'react';
import { connect } from 'dva';
import { restrictions } from './../../utils/restrictions';

import styles from './styles.css';
import ViewCasesHeader from './ViewCasesHeader';
import ViewCasesFilter from './ViewCasesFilter';
import ViewCasesTable from './ViewCasesTable';

class ViewCases extends Component {
  componentDidMount() {
    const { dispatch, match, user } = this.props;

    if (restrictions[user.position] && restrictions[user.position].includes('VIEW_ALL_CASES')) {
      dispatch({ type: 'cases/FETCH_CASES_OF_ACCOUNT_MANAGER', payload: user.fullName })
    } else {
      dispatch({ type: 'cases/FETCH_ALL_CASES' });
    }

    dispatch({ type: 'clients/FETCH_CLIENTS' });
    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
    dispatch({ type: 'engineers/FETCH_SE_LEADS' });
    dispatch({ type: 'vendors/FETCH_VENDORS' });
    dispatch({ type: 'products/FETCH_PRODUCTS' });
  }

  handleFilterCases = (data) => {
    const { user, dispatch } = this.props;

    if (restrictions[user.position] && restrictions[user.position].includes('VIEW_ALL_CASES')) {
      dispatch({ type: 'cases/FETCH_CASES_OF_ACCOUNT_MANAGER_BY_FILTER', payload: data })
    } else {
      dispatch({ type: 'cases/FETCH_CASES_BY_FITLER', payload: data })
    }
  }

  handleRemoveFilter = (data) => {
    const { user, dispatch } = this.props;

    if (restrictions[user.position] && restrictions[user.position].includes('VIEW_ALL_CASES')) {
      dispatch({ type: 'cases/REMOVE_FILTER_OF_CASES_OF_ACCOUNT_MANAGER', payload: data })
    } else {
      dispatch({ type: 'cases/REMOVE_FILTER', payload: data })
    }
  }

  handleResetFilters = (data) => {
    const { user, dispatch } = this.props;

    if (restrictions[user.position] && restrictions[user.position].includes('VIEW_ALL_CASES')) {
      dispatch({ type: 'cases/RESET_FILTERS_OF_CASES_OF_ACCOUNT_MANAGER', payload: data })
    } else {
      dispatch({ type: 'cases/RESET_FILTERS' })
    }
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
          onFilterCases={this.handleFilterCases}
          onResetFilters={this.handleResetFilters}
          onRemoveFilter={this.handleRemoveFilter}
          onSelectVendor={data =>
            dispatch({
              type: 'products/FETCH_PRODUCTS_OF_VENDOR',
              payload: data,
            })
          }
          filters={filters}
          clients={clients}
          engineers={engineers}
          leads={leads}
          vendors={vendors}
          products={products}
        />
        <ViewCasesTable data={cases} />
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
    user: state.user.data,
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
