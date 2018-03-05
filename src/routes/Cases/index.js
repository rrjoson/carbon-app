import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';

const { H2 } = Typography;

class Cases extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'cases/FETCH_NEXT_ID' });
    dispatch({ type: 'vendors/FETCH_VENDORS' });
    dispatch({ type: 'products/FETCH_PRODUCTS' });
    dispatch({ type: 'clients/FETCH_CLIENTS' });
    dispatch({ type: 'customers/FETCH_CUSTOMERS' });
    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
  }

  render() {
    const {
      dispatch,
      loading,
      nextId,
      vendors,
      products,
      clients,
      customers,
      engineers,
    } = this.props;

    if (
      !nextId ||
      !vendors.length ||
      !products.length ||
      !clients.length ||
      !customers.length ||
      !engineers.length
    ) return null;

    return (
      <div>
        <H2>New Case</H2>
        <DynamicFieldSet
          loading={loading}
          nextId={nextId}
          products={products}
          customers={customers}
          clients={clients}
          vendors={vendors}
          engineers={engineers}
          onSave={(data) => dispatch({ type: 'cases/CREATE_CASE', payload: data })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['cases/CREATE_CASE'],
    nextId: state.cases.nextId,
    vendors: state.vendors.data,
    clients: state.clients.data,
    products: state.products.data,
    customers: state.customers.data,
    engineers: state.engineers.data,
  };
}

Cases.propTypes = {};

export default connect(mapStateToProps)(Cases);