import React, { Component } from 'react';
import { connect } from 'dva';

import EditAccountHeader from './EditAccountHeader';
import EditAccountForm from './EditAccountForm';
import EditAccountPasswordForm from './EditAccountPasswordForm';

import { RestrictedPage } from './../../components';

import styles from './styles.css';

class AddUser extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'user/FETCH_ACCOUNT' });
  }

  render() {
    const {
      dispatch,
      isUpdatingUser,
      isUpdatingPassword,
      user,
    } = this.props;

    return (
      <RestrictedPage action="ADD_USER">
        <div className={styles.addClients}>
          <EditAccountHeader />
          <EditAccountForm
            loading={isUpdatingUser}
            user={user}
            onSave={data => dispatch({ type: 'user/UPDATE_USER', payload: data })}
          />
          <EditAccountPasswordForm
            loading={isUpdatingPassword}
            onSave={data => dispatch({ type: 'user/UPDATE_PASSWORD', payload: data })}
          />
        </div>
      </RestrictedPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    isUpdatingUser: state.loading.effects['user/UPDATE_USER'],
    isUpdatingPassword: state.loading.effects['user/UPDATE_PASSWORD'],
    user: state.user.user,
  };
}

AddUser.propTypes = {};

export default connect(mapStateToProps)(AddUser);
