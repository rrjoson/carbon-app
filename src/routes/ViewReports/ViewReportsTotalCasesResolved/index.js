import React from 'react';
import checkSvg from 'assets/check.svg';

import styles from './styles.css';

function viewReportsTotalCasesResolved(props) {
  const { type, data } = props;

  console.warn(data)

  return (
    <div className={styles.viewReportsProduct}>
      <img src={checkSvg} width="62" height="62" />
      <div className={styles.content}>
        <div className={styles.title}>TOTAL CASES RESOLVED</div>
        <div className={styles.value}>{data}</div>
      </div>
    </div>
  );
}

viewReportsTotalCasesResolved.propTypes = {};

export default viewReportsTotalCasesResolved;
