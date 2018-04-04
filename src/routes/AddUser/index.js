import React, { Component } from 'react';
import { connect } from 'dva';

import AddUserHeader from './AddUserHeader';
import AddUserForm from './AddUserForm';

import { restrictions } from './../../utils/restrictions';

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
      user,
    } = this.props;

    if (restrictions[user.position].includes('ADD_USER')) {
      return (
        <div className={styles.center}>Sorry, but you can't access this page.</div>
      );
    }

    return (
      <div className={styles.addClients}>
        <AddUserHeader />
        <AddUserForm
          loading={loading}
          onSave={data => dispatch({ type: 'user/ADD_USER', payload: data })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['user/ADD_USER'],
    user: state.user.data,
  };
}

AddUser.propTypes = {};

export default connect(mapStateToProps)(AddUser);
