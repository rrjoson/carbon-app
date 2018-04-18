import React from 'react';

import styles from './styles.css';

function ViewReportsCases(props) {
  const { type } = props;

  return (
    <div className={styles.viewReportsCases}>
      <div className={styles.title}>SUMMARY OF CASE STATUS</div>
    </div>
  );
}

ViewReportsCases.propTypes = {};

export default ViewReportsCases;
