import React from 'react';

import styles from './styles.css';

function ViewReportsSE(props) {
  const { type, data } = props;

  return (
    <div className={styles.viewReportsSE}>
      <div className={styles.title}>PRODUCT UTILIZATION</div>
      <div className={styles.list}>
        <For each="item" of={data}>
          <div className={styles.item}>
            <div className={styles.name}>{item.assignedsystemsengineer}</div>
            <div className={styles.count}>
              <Choose>
                <When condition={item.number_of_activities.length === 1}>
                  {item.number_of_activities} Activity
                </When>
                <Otherwise>
                  {item.number_of_activities} Activities
                </Otherwise>
              </Choose>
            </div>
          </div>
        </For>
      </div>
    </div>
  );
}

ViewReportsSE.propTypes = {};

export default ViewReportsSE;
