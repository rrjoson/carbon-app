import React from 'react';
import locationSvg from 'assets/location.svg';

import styles from './styles.css';

function ViewReportsTurnaround(props) {
  const { type } = props;

  return (
    <div className={styles.viewReportsTurnaround}>
      <img src={locationSvg} width="62" height="62" />
      <div className={styles.content}>
        <div className={styles.title}>AVE. TURNAROUND TIME</div>
        <div className={styles.value}>4 days</div>
      </div>
    </div>
  );
}

ViewReportsTurnaround.propTypes = {};

export default ViewReportsTurnaround;
