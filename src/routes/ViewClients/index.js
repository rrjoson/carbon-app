import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import ViewClientsHeader from './ViewClientsHeader';
import ViewClientsTable from './ViewClientsTable';

import { RestrictedPage } from './../../components';

class ViewCases extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'clients/FETCH_CLIENTS' });
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
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
