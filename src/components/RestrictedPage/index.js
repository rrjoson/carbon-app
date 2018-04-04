import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { restrictions } from '../../utils/restrictions';
import styles from './styles.css';

class RestrictedPage extends Component {
  render() {
    const {
      user,
      children,
      action,
    } = this.props;

    if (restrictions[user.position].includes(action)) {
      return (
        <div className={styles.center}>
          Sorry, but you can't access this page.
        </div>
      );
    }

    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

RestrictedPage.propTypes = {};

export default connect(mapStateToProps)(RestrictedPage);
