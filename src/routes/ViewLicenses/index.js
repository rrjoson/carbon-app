import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import ViewLicensesHeader from './ViewLicensesHeader';
import ViewLicensesTable from './ViewLicensesTable';

class ViewCases extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'licenses/FETCH_ACTIVE_LICENSES' });
    dispatch({ type: 'licenses/FETCH_EXPIRED_LICENSES' });
  }

  render() {
    const {
      activeLicenses,
      expiredLicenses,
    } = this.props;

    return (
      <div className={styles.viewCases}>
        <ViewLicensesHeader type="active" />
        <ViewLicensesTable
          data={activeLicenses}
        />
        <ViewLicensesHeader type="expired" />
        <ViewLicensesTable
          data={expiredLicenses}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeLicenses: state.licenses.active,
    expiredLicenses: state.licenses.expired,
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
