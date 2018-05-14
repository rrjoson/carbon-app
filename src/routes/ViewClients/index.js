import React, { Component } from 'react';
import { connect } from 'dva';
import { restrictions } from './../../utils/restrictions';

import styles from './styles.css';
import ViewClientsHeader from './ViewClientsHeader';
import ViewClientsTable from './ViewClientsTable';

import { RestrictedPage } from './../../components';

class ViewCases extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;

    if (restrictions[user.position] && restrictions[user.position].includes('VIEW_ALL_CLIENTS')) {
      dispatch({ type: 'clients/FETCH_CLIENTS_OF_ACCOUNT_MANAGER', payload: user.fullName })
    } else {
      dispatch({ type: 'clients/FETCH_CLIENTS' });
    }
  }

  render() {
    const { clients } = this.props;

    return (
      <RestrictedPage action="VIEW_CLIENTS">
        <ViewClientsHeader />
        <ViewClientsTable data={clients} />
      </RestrictedPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    clients: state.clients.data,
    user: state.user.data,
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
