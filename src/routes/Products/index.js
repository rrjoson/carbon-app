import React from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';

const { H2 } = Typography;

function Products(props) {
  const {
    dispatch,
    products,
  } = props;

  return (
    <div className={styles.vendors}>
      <H2>Products</H2>
      <DynamicFieldSet
        onSave={(data) => dispatch({ type: 'products/SAVE_PRODUCTS', payload: data })}
        products={products}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products.data,
  };
}

Products.propTypes = {};

export default connect(mapStateToProps)(Products);
