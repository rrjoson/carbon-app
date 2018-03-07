import React from 'react';
// import PropTypes from 'prop-types';

import { Row, Button } from 'antd';
import { Link } from './../../../components';

import styles from './styles.css';

function HomeTableHeader(props) {
  return (
    <div className={styles.homeTableHeader}>
      <div className={styles.homeTableHeader__title}>My Cases</div>
      <div className={styles.homeTableHeader__button}>
        <Link to="/cases/add">
          <Button>New Case</Button>
        </Link>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cases: state.cases.data,
  };
}

HomeTableHeader.propTypes = {};

export default HomeTableHeader;
