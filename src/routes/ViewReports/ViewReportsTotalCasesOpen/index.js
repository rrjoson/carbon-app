import React from 'react';
import grammarSvg from 'assets/grammar.svg';

import styles from './styles.css';

function ViewReportsClient(props) {
  const { type, data } = props;

  console.warn(123, data)

  return (
    <div className={styles.viewReportsClient}>
      <img src={grammarSvg} width="62" height="62" />
      <div className={styles.content}>
        <div className={styles.title}>TOTAL CASES OPEN</div>
        <div className={styles.value}>{data}</div>
      </div>
    </div>
  );
}

ViewReportsClient.propTypes = {};

export default ViewReportsClient;
