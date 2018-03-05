import React from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';


const { H2 } = Typography;

function Vendors(props) {
  const {
    dispatch,
    loading,
    vendors,
  } = props;

  return (
    <div className={styles.vendors}>
      <H2>New Vendor</H2>
      <DynamicFieldSet
        loading={loading}
        vendors={vendors}
        onSave={(data) => dispatch({ type: 'vendors/SAVE_VENDORS', payload: data })}
      />
    </div>
  );
}

function mapStateToProps(state) {

  return {
    loading: state.loading.effects['vendors/SAVE_VENDORS'],
    vendors: state.vendors.data,
  };
}

Vendors.propTypes = {};

export default connect(mapStateToProps)(Vendors);

