import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import ViewClientsHeader from './ViewClientsHeader';
import ViewClientsTable from './ViewClientsTable';

class ViewCases extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'clients/FETCH_CLIENTS' });
  }

  render() {
    const {
      clients,
    } = this.props;

    if (!clients.length) return null;

    return (
      <div className={styles.viewCases}>
        <ViewClientsHeader />
        <ViewClientsTable
          data={clients}
        />
      </div>
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
