import React, { Component } from 'react';
import { connect } from 'dva';

import Default from './Default';
import Dashboard from './Dashboard';

import styles from './styles.css';

class Home extends Component {
  render() {
    const { user } = this.props;

    if (user.position !== 'Systems Engineer') {
      return <Dashboard />;
    }

    return <Default />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

Home.propTypes = {};

export default connect(mapStateToProps)(Home);
