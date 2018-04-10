import React, { Component } from 'react';
import { connect } from 'dva';

import ViewAccountsHeader from './ViewAccountsHeader';
import ViewAccountsTable from './ViewAccountsTable';

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
      dispatch,
      administrator,
      employees,
    } = this.props;

    return (
      <RestrictedPage action="ADD_USER">
        <div className={styles.dashboard}>
          <ViewAccountsHeader type="administrator" />
          <ViewAccountsTable
            data={administrator}
            onToggleStatus={(id, isActive) => dispatch({ type: 'user/UPDATE_ACCOUNT', payload: { id, isActive } })}
          />

          <ViewAccountsHeader type="employees" />
          <ViewAccountsTable
            data={employees}
            onToggleStatus={(id, isActive) => dispatch({ type: 'user/UPDATE_ACCOUNT', payload: { id, isActive } })}
          />
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
