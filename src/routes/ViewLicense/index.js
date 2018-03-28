import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import ViewLicenseHeader from './ViewLicenseHeader';
import ViewLicenseTable from './ViewLicenseTable';

class ViewLicense extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'licenses/FETCH_LICENSE', payload: match.params.licenseId });
  }

  render() {
    const {
      selectedLicense,
    } = this.props;

    if (!selectedLicense) return null;

    return (
      <div className={styles.viewLicense}>
        <ViewLicenseHeader
          licenseId={selectedLicense.licenseId}
        />
        <ViewLicenseTable
          data={[selectedLicense]}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedLicense: state.licenses.selected,
  };
}

ViewLicense.propTypes = {};

export default connect(mapStateToProps)(ViewLicense);
