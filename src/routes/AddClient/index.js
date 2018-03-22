import React from 'react';
import { connect } from 'dva';

import AddClientHeader from './AddClientHeader';
import AddClientForm from './AddClientForm';

import styles from './styles.css';

function AddClient(props) {
  const {
    dispatch,
    loading,
    engineers,
  } = props;

  return (
    <div className={styles.addClients}>
      <AddClientHeader />
      <AddClientForm
        loading={loading}
        onSave={(data) => dispatch({ type: 'clients/ADD_CLIENT', payload: data })}
        engineers={engineers}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['clients/ADD_CLIENT'],
    engineers: state.engineers.data,
  };
}

AddClient.propTypes = {};

export default connect(mapStateToProps)(AddClient);
