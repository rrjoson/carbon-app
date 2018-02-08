import React from 'react';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';


const { H2 } = Typography;

function Vendors() {
  return (
    <div className={styles.vendors}>
      <H2>New Vendor</H2>
      <DynamicFieldSet />
    </div>
  );
}

Vendors.propTypes = {};

export default Vendors;
