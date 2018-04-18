import React from 'react';

import styles from './styles.css';

function ViewReportsSolution(props) {
  const { type } = props;

  return (
    <div className={styles.viewReportsSolution}>
      <div className={styles.title}>SOLUTION CONTRIBUTION</div>
    </div>
  );
}

ViewReportsSolution.propTypes = {};

export default ViewReportsSolution;
