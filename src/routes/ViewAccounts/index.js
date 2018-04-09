import React, { Component } from 'react';
import { connect } from 'dva';

import Header from './Header';
import Table from './Table';

import { RestrictedPage } from './../../components';

import styles from './styles.css';

class Dashboard extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'user/FETCH_ACCOUNTS' });
  }

  render() {
    const {
      administrator,
      employees,
    } = this.props;

    return (
      <RestrictedPage action="ADD_USER">
        <div className={styles.dashboard}>
          <Header type="administrator" />
          <Table data={administrator} />

          <Header type="employees" />
          <Table data={employees} />
        </div>
      </RestrictedPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    administrator: state.user.administrator,
    employees: state.user.employees,
  };
}

Dashboard.propTypes = {};

export default connect(mapStateToProps)(Dashboard);
