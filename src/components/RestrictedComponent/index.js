import React, { Component } from 'react';
import { connect } from 'dva';
import { restrictions } from '../../utils/restrictions';

class RestrictedComponent extends Component {

  render() {
    const {
      user,
      children,
      action,
    } = this.props;

    if (restrictions[user.position].includes(action)) return null;

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

RestrictedComponent.propTypes = {};

export default connect(mapStateToProps)(RestrictedComponent);
