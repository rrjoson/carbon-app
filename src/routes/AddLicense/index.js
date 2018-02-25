import React from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import AddLicenseHeader from './AddLicenseHeader';
import AddLicenseForm from './AddLicenseForm';

function AddLicense(props) {
  return (
    <div className={styles.addLicenseHeader}>
      <AddLicenseHeader />
      <AddLicenseForm />
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

AddLicense.propTypes = {};

export default connect(mapStateToProps)(AddLicense);
