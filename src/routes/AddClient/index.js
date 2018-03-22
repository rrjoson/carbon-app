import React, { Component } from 'react';
import { connect } from 'dva';

import AddClientHeader from './AddClientHeader';
import AddClientForm from './AddClientForm';

import styles from './styles.css';

class AddClient extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'accountManagers/FETCH_ACCOUNT_MANAGERS' });
  }

  render() {
    const {
      dispatch,
      loading,
      accountManagers,
    } = this.props;

    if (
      !accountManagers.length
    ) return null;

    return (
      <div className={styles.addClients}>
        <AddClientHeader />
        <AddClientForm
          loading={loading}
          onSave={data => dispatch({ type: 'clients/ADD_CLIENT', payload: data })}
          accountManagers={accountManagers}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['clients/ADD_CLIENT'],
    accountManagers: state.accountManagers.data,
  };
}

AddClient.propTypes = {};

export default connect(mapStateToProps)(AddClient);
