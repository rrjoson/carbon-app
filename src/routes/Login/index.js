import React, { Component } from 'react';
import { connect } from 'dva';

import LoginForm from './LoginForm';

import styles from './styles.css';

class Login extends Component {
  componentDidMount() {}

  render() {
    const {
      dispatch,
    } = this.props;

    return (
      <div className={styles.login}>
        <LoginForm
          onLogin={data => dispatch({ type: 'auth/LOGIN', payload: data })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cases: state.cases.data,
    clients: state.clients.data,
  };
}

Login.propTypes = {};

export default connect(mapStateToProps)(Login);
