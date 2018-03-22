import React from 'react';
import { connect } from 'dva';

import AddClientHeader from './AddClientHeader';
import AddClientForm from './AddClientForm';

import styles from './styles.css';

function AddClient(props) {
  const {
    dispatch,
    engineers,
  } = props;

  return (
    <div className={styles.addClients}>
      <AddClientHeader />
      <AddClientForm
        onSave={(data) => dispatch({ type: 'clients/ADD_CLIENT', payload: data })}
        engineers={engineers}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    engineers: state.engineers.data,
  };
}

AddClient.propTypes = {};

export default connect(mapStateToProps)(AddClient);
