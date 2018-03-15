import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import EditVendorsForm from './EditVendorsForm';

const { H2 } = Typography;

class Vendors extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'vendors/FETCH_VENDORS' });
  }

  render() {
    const {
      dispatch,
      loading,
      vendors,
    } = this.props;

    if (!vendors.length) {
      return null;
    }

    return (
      <div className={styles.vendors}>
        <H2>New Vendor</H2>
        <EditVendorsForm
          loading={loading}
          vendors={vendors}
          onSave={(data) => dispatch({ type: 'vendors/SAVE_VENDORS', payload: data })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['vendors/SAVE_VENDORS'],
    vendors: state.vendors.data,
  };
}

Vendors.propTypes = {};

export default connect(mapStateToProps)(Vendors);

