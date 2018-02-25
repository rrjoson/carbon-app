import React from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';

const { H2 } = Typography;

function Cases(props) {
  const {
    dispatch,
    vendors,
    products,
    clients,
    customers,
    engineers,
  } = props;

  return (
    <div>
      <H2>New Case</H2>
      <DynamicFieldSet
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

function mapStateToProps(state) {
  return {
    vendors: state.vendors.data,
    clients: state.clients.data,
    products: state.products.data,
    customers: state.customers.data,
    engineers: state.engineers.data,
  };
}

Cases.propTypes = {};

export default connect(mapStateToProps)(Cases);

