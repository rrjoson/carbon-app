import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';

const Status = (props) => {
  const circle = classnames({
    [styles.circle]: true,
    [styles.red]: props.type.includes('Overdue'),
    [styles.gray]: props.type.includes('Open'),
    [styles.green]: props.type.includes('Resolved'),
    [styles.orange]: props.type.includes('Pending'),
    [styles.blue]: props.type.includes('Ongoing'),
  });

  return (
    <span className={styles.status}>
      <span className={circle} />
      <span className={styles.text}>{props.type}</span>
    </span>
  );
};

export default Status;
