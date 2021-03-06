import React, { Component } from 'react';
import { connect } from 'dva';

import LoginForm from './LoginForm';

import styles from './styles.css';

class Login extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'user/CHECK_IF_USER_IS_LOGGED_IN' });
  }

  render() {
    const {
      dispatch,
      loading,
    } = this.props;

    return (
      <div className={styles.login}>
        <LoginForm
          loading={loading}
          onLogin={data => dispatch({ type: 'user/LOGIN', payload: data })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.effects['user/LOGIN'],
  };
}

Login.propTypes = {};

export default connect(mapStateToProps)(Login);
