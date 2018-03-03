import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';

const { H2 } = Typography;

class Products extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'products/FETCH_PRODUCTS' });
    dispatch({ type: 'vendors/FETCH_VENDORS' });
  }

  render() {
    const {
      dispatch,
      products,
      vendors,
    } = this.props;

    if (!products.length || !vendors.length) return null;

    return (
      <div className={styles.vendors}>
        <H2>Products</H2>
        <DynamicFieldSet
          onSave={(data) => dispatch({ type: 'products/SAVE_PRODUCTS', payload: data })}
          products={products}
          vendors={vendors}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.data,
    vendors: state.vendors.data,
  };
}

Products.propTypes = {};

export default connect(mapStateToProps)(Products);
