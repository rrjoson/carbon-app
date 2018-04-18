import React from 'react';
import { Progress } from 'antd';

import styles from './styles.css';

function ViewReportsSeverity(props) {
  const { type } = props;

  return (
    <div className={styles.viewReportsSeverity}>
      <div className={styles.title}>CASES BY SEVERITY</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.label}>Level 1</div>
          <div className={styles.progress}>
            <Progress percent={50} showInfo={false} />
          </div>
          <div className={styles.count}>12</div>
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Level 2</div>
          <div className={styles.progress}>
            <Progress percent={30} showInfo={false} />
          </div>
          <div className={styles.count}>12</div>
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Level 3</div>
          <div className={styles.progress}>
            <Progress percent={30} showInfo={false} />
          </div>
          <div className={styles.count}>12</div>
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Level 4</div>
          <div className={styles.progress}>
            <Progress percent={0} showInfo={false} />
          </div>
          <div className={styles.count}>0</div>
        </div>
      </div>
    </div>
  );
}

ViewReportsSeverity.propTypes = {};

export default ViewReportsSeverity;
