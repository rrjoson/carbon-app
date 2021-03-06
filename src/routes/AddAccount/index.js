import React, { Component } from 'react';
import { connect } from 'dva';

import Header from './Header';
import Form from './Form';

import { RestrictedPage } from './../../components';

import styles from './styles.css';

class AddUser extends Component {
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
    } = this.props;

    return (
      <RestrictedPage action="ADD_USER">
        <div className={styles.addClients}>
          <Header />
          <Form
            loading={loading}
            onSave={data => dispatch({ type: 'user/ADD_USER', payload: data })}
          />
        </div>
      </RestrictedPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['user/ADD_USER'],
  };
}

AddUser.propTypes = {};

export default connect(mapStateToProps)(AddUser);
