import React, { Component } from 'react';
import { connect } from 'dva';
import { restrictions } from '../../utils/restrictions';

class Restrict extends Component {

  render() {
    const {
      user,
      children,
      permission,
    } = this.props;

    if (restrictions[user.position].includes(permission)) return null;

    return (
      <div>
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

Restrict.propTypes = {};

export default connect(mapStateToProps)(Restrict);
