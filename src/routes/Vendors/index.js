import React from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';


const { H2 } = Typography;

function Vendors(props) {
  const {
    dispatch,
    vendors,
  } = props;

  return (
    <div className={styles.vendors}>
      <H2>New Vendor</H2>
      <DynamicFieldSet
        vendors={vendors}
        onSave={(data) => dispatch({ type: 'vendors/SAVE_VENDORS', payload: data })}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    vendors: state.vendors.data,
  };
}

Vendors.propTypes = {};

export default connect(mapStateToProps)(Vendors);

