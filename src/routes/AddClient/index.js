import React from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import AddClientForm from './AddClientForm';

const { H2 } = Typography;

function AddClient(props) {
  const {
    dispatch,
    engineers,
  } = props;

  return (
    <div className={styles.addClients}>
      <H2>Add Clients</H2>
      <AddClientForm
        onSave={(data) => dispatch({ type: 'clients/ADD_CLIENT', payload: data })}
        engineers={engineers}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    engineers: state.engineers.data
  };
}

AddClient.propTypes = {};

export default connect(mapStateToProps)(AddClient);
