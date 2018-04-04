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

    dispatch({ type: 'licenses/FETCH_LICENSES' });
  }

  render() {
    const {
      licenses,
    } = this.props;

    if (!licenses.length) return null;

    return (
      <div className={styles.viewCases}>
        <ViewLicensesHeader />
        <ViewLicensesTable
          data={licenses}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    licenses: state.licenses.data,
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
