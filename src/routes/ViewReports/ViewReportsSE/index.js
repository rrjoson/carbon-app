import React from 'react';

import styles from './styles.css';

function ViewReportsSE(props) {
  const { type } = props;

  return (
    <div className={styles.viewReportsSE}>
      <div className={styles.title}>TOP SE PERFORMERS</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.name}>Richard</div>
          <div className={styles.count}>15 Activities</div>
        </div>
        <div className={styles.item}>
          <div className={styles.name}>Richard</div>
          <div className={styles.count}>15 Activities</div>
        </div>
      </div>
    </div>
  );
}

ViewReportsSE.propTypes = {};

export default ViewReportsSE;
