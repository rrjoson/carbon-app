import React from 'react';
import { Progress } from 'antd';

import styles from './styles.css';

function ViewReportsSeverity(props) {
  const { type, severityCount, totalCasesCount } = props;

  console.warn(severityCount)
  console.warn(totalCasesCount)

  const getPercentage = (casesBySeverityCount) => {
    return (casesBySeverityCount / totalCasesCount) * 100;
  };

  return (
    <div className={styles.viewReportsSeverity}>
      <div className={styles.title}>CASES BY SEVERITY</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.label}>Level 1</div>
          <div className={styles.progress}>
            <Progress percent={getPercentage(severityCount[0] ? severityCount[0].number_of_cases_severity : 0)} showInfo={false} />
          </div>
          <div className={styles.count}>{severityCount[0] ? severityCount[0].number_of_cases_severity : 0}</div>
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Level 2</div>
          <div className={styles.progress}>
            <Progress percent={getPercentage(severityCount[1] ? severityCount[1].number_of_cases_severity : 0)} showInfo={false} />
          </div>
          <div className={styles.count}>{severityCount[1] ? severityCount[1].number_of_cases_severity : 0}</div>
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Level 3</div>
          <div className={styles.progress}>
            <Progress percent={getPercentage(severityCount[2] ? severityCount[2].number_of_cases_severity : 0)} showInfo={false} />
          </div>
          <div className={styles.count}>{severityCount[2] ? severityCount[2].number_of_cases_severity : 0}</div>
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Level 4</div>
          <div className={styles.progress}>
            <Progress percent={getPercentage(severityCount[3] ? severityCount[3].number_of_cases_severity : 0)} showInfo={false} />
          </div>
          <div className={styles.count}>{severityCount[3] ? severityCount[3].number_of_cases_severity : 0}</div>
        </div>
      </div>
    </div>
  );
}

ViewReportsSeverity.propTypes = {};

export default ViewReportsSeverity;
