import React from 'react';
import usersSvg from 'assets/users.svg';

import styles from './styles.css';

function ViewReportsClient(props) {
  const { data } = props;

  return (
    <div className={styles.viewReportsClient}>
      <img src={usersSvg} width="62" height="62" />
      <div className={styles.content}>
        <div className={styles.title}>CLIENT WITH MOST CASES</div>
        <div className={styles.value}>{data}</div>
      </div>
    </div>
  );
}

ViewReportsClient.propTypes = {};

export default ViewReportsClient;
