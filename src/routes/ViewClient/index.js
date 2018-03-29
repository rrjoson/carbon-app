import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import ViewClientHeader from './ViewClientHeader';
import ViewClientTable from './ViewClientTable';

class ViewClient extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'clients/FETCH_CLIENT', payload: match.params.accountName });
  }

  render() {
    const {
      selectedClient,
    } = this.props;

    if (!selectedClient) return null;

    return (
      <div className={styles.viewLicense}>
        <ViewClientHeader
          accountName={selectedClient.accountName}
        />
        <ViewClientTable
          data={[selectedClient]}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedClient: state.clients.selected,
  };
}

ViewClient.propTypes = {};

export default connect(mapStateToProps)(ViewClient);
