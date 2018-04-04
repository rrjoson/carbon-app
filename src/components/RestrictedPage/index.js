import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import { restrictions } from '../../utils/restrictions';

import { H3 } from './../../components/Typography';

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
        <div className={styles.restrictedPage}>
          <Icon type="frown-o" style={{ fontSize: 50 }} />
          <H3>Sorry, but you can't access this page.</H3>
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
