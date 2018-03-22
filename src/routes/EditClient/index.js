import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import EditClientForm from './EditClientForm';

const { H2 } = Typography;

class EditClient extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'clients/FETCH_CLIENT', payload: match.params.accountName });
    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
  }

  render() {
    const {
      dispatch,
      loading,
      engineers,
      client,
    } = this.props;

    if (
      !client ||
      !engineers.length
    ) return null;

    return (
      <div className={styles.addClients}>
        <H2>Edit Client</H2>
        <EditClientForm
          loading={loading}
          onSave={data => dispatch({ type: 'clients/UPDATE_CLIENT', payload: data })}
          engineers={engineers}
          client={client}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['clients/UPDATE_CLIENT'],
    engineers: state.engineers.data,
    client: state.clients.selected,
  };
}

EditClient.propTypes = {};

export default connect(mapStateToProps)(EditClient);
