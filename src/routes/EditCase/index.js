import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import EditCaseHeader from './EditCaseHeader';
import EditCaseForm from './EditCaseForm';

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
          onSave={(data) => dispatch({ type: 'cases/UPDATE_CASE', payload: data })}
        />
      </div>
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

