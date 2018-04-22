import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import EditCaseHeader from './EditCaseHeader';
import EditCaseForm from './EditCaseForm';

import { RestrictedPage } from './../../components';

class EditCase extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'cases/FETCH_CASE', payload: match.params.caseId });
    dispatch({ type: 'vendors/FETCH_VENDORS' });

    dispatch({ type: 'clients/FETCH_CLIENTS' });
    dispatch({ type: 'customers/FETCH_CUSTOMERS' });
    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.selectedCase !== this.props.selectedCase) {
      dispatch({ type: 'clients/FETCH_CLIENT', payload: nextProps.selectedCase.customer });
      dispatch({ type: 'products/FETCH_PRODUCTS_OF_VENDOR', payload: nextProps.selectedCase.vendor });
      dispatch({ type: 'customers/FETCH_CUSTOMERS_BY_CLIENT', payload: nextProps.selectedCase.customer });
    }
  }

  render() {
    const {
      dispatch,
      loading,
      selectedCase,
      vendors,
      products,
      clients,
      customers,
      engineers,
    } = this.props;

    if (
      !selectedCase ||
      !vendors.length ||
      !products.length ||
      !clients.length ||
      !customers.length ||
      !engineers.length
    ) return null;

    return (
      <RestrictedPage action="EDIT_CASE">
        <div>
          <EditCaseHeader />
          <EditCaseForm
            loading={loading}
            selectedCase={selectedCase}
            products={products}
            customers={customers}
            clients={clients}
            vendors={vendors}
            engineers={engineers}
            onSelectVendor={(data) => dispatch({ type: 'products/FETCH_PRODUCTS_OF_VENDOR', payload: data })}
            onDeleteCase={(data) => dispatch({ type: 'cases/DELETE_CASE', payload: data })}
            onSelectClient={(data) => dispatch({ type: 'customers/FETCH_CUSTOMERS_BY_CLIENT', payload: data })}
            onSave={(data) => dispatch({ type: 'cases/UPDATE_CASE', payload: data })}
          />
        </div>
      </RestrictedPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['cases/UPDATE_CASE'],
    selectedCase: state.cases.selected,
    vendors: state.vendors.data,
    clients: state.clients.data,
    products: state.products.data,
    customers: state.customers.data,
    engineers: state.engineers.data,
  };
}

EditCase.propTypes = {};

export default connect(mapStateToProps)(EditCase);

