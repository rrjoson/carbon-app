import React, { Component } from 'react';
import { connect } from 'dva';

import EditAccountHeader from './EditAccountHeader';
import EditAccountForm from './EditAccountForm';
import EditAccountPasswordForm from './EditAccountPasswordForm';

import styles from './styles.css';

class AddUser extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'user/FETCH_ACCOUNT', payload: match.params.id });
  }

  render() {
    const {
      dispatch,
      isUpdatingUser,
      isUpdatingPassword,
      selectedUser,
      loggedInUser,
    } = this.props;

    return (
      <div className={styles.addClients}>
        <EditAccountHeader />
        <EditAccountForm
          loading={isUpdatingUser}
          user={selectedUser}
          onSave={data => dispatch({ type: 'user/UPDATE_USER', payload: data })}
          onDelete={data => dispatch({ type: 'user/DELETE_USER', payload: data })}
        />
        <EditAccountPasswordForm
          loading={isUpdatingPassword}
          onSave={data => dispatch({ type: 'user/UPDATE_PASSWORD', payload: data })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isUpdatingUser: state.loading.effects['user/UPDATE_USER'],
    isUpdatingPassword: state.loading.effects['user/UPDATE_PASSWORD'],
    selectedUser: state.user.selected,
    loggedInUser: state.user.data,
  };
}

AddUser.propTypes = {};

export default connect(mapStateToProps)(AddUser);
