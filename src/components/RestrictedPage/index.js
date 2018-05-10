import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import { restrictions } from '../../utils/restrictions';

import forbidden from '../../assets/forbidden.svg';

import { H1, H4 } from './../../components/Typography';

import styles from './styles.css';

class RestrictedPage extends Component {
  render() {
    const { user, children, action } = this.props;

    if (
      restrictions[user.position] &&
      restrictions[user.position].includes(action)
    ) {
      return (
        <div className={styles.restrictedPage}>
          <img className={styles.image} src={forbidden} />
          <div className={styles.text}>
            <H1>403</H1>
            <H4>Sorry, but you can't access this page.</H4>
          </div>
        </div>
      );
    }

    return <Fragment>{children}</Fragment>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

RestrictedPage.propTypes = {};

export default connect(mapStateToProps)(RestrictedPage);
