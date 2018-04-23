import React from 'react';
import usersSvg from 'assets/users.svg';

import styles from './styles.css';

function ViewReportsHeader(props) {
  const { data } = props;

  return (
    <div className={styles.viewReportsHeader}>
      Stats for April 2018 - May 2018
    </div>
  );
}

ViewReportsHeader.propTypes = {};

export default ViewReportsHeader;
