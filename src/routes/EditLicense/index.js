import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import EditLicenseHeader from './EditLicenseHeader';
import EditLicenseForm from './EditLicenseForm';

class EditLicense extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'licenses/FETCH_LICENSE', payload: match.params.licenseId });
    dispatch({ type: 'vendors/FETCH_VENDORS' });
    dispatch({ type: 'products/FETCH_PRODUCTS' });
    dispatch({ type: 'clients/FETCH_CLIENTS' });
  }

  render() {
    const {
      dispatch,
      loading,
      selectedLicense,
      vendors,
      products,
      clients,
    } = this.props;

    if (
      !selectedLicense ||
      !vendors.length ||
      !products.length ||
      !clients.length
    ) return null;

    return (
      <div className={styles.addLicenseHeader}>
        <EditLicenseHeader />
        <EditLicenseForm
          loading={loading}
          selectedLicense={selectedLicense}
          vendors={vendors}
          products={products}
          clients={clients}
          onSelectVendor={data => dispatch({ type: 'products/FETCH_PRODUCTS_OF_VENDOR', payload: data })}
          onSave={data => dispatch({ type: 'licenses/UPDATE_LICENSE', payload: data })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['licenses/UPDATE_LICENSE'],
    selectedLicense: state.licenses.selected,
    vendors: state.vendors.data,
    clients: state.clients.data,
    products: state.products.data,
  };
}

EditLicense.propTypes = {};

export default connect(mapStateToProps)(EditLicense);