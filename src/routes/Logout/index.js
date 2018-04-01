import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';

class Logout extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'user/LOGOUT' });
  }

  render() {
    return null;
  }
}

function mapStateToProps() {
  return {};
}

Logout.propTypes = {};

export default connect(mapStateToProps)(Logout);
