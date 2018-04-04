import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import EditClientForm from './EditClientForm';

import { RestrictedPage } from './../../components';

const { H2 } = Typography;

class EditClient extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'clients/FETCH_CLIENT', payload: match.params.accountName });
    dispatch({ type: 'accountManagers/FETCH_ACCOUNT_MANAGERS' });
  }

  render() {
    const {
      dispatch,
      loading,
      accountManagers,
      client,
    } = this.props;

    if (
      !client ||
      !accountManagers.length
    ) return null;

    return (
      <RestrictedPage action="UPDATE_CLIENT">
        <div className={styles.addClients}>
          <H2>Edit Client</H2>
          <EditClientForm
            loading={loading}
            onSave={data => dispatch({ type: 'clients/UPDATE_CLIENT', payload: data })}
            accountManagers={accountManagers}
            client={client}
          />
        </div>
      </RestrictedPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['clients/UPDATE_CLIENT'],
    accountManagers: state.accountManagers.data,
    client: state.clients.selected,
  };
}

EditClient.propTypes = {};

export default connect(mapStateToProps)(EditClient);
