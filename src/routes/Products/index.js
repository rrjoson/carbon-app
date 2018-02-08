import React from 'react';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';

const { H2 } = Typography;

function Products() {
  return (
    <div className={styles.vendors}>
      <H2>Products</H2>
      <DynamicFieldSet />
    </div>
  );
}

Products.propTypes = {};

export default Products;
