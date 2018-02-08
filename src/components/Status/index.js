import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';

const Status = (props) => {
  const circle = classnames({
    [styles.circle]: true,
    [styles.red]: props.type === 'overdue',
    [styles.gray]: props.type === 'open',
    [styles.green]: props.type === 'resolved',
  });

  return (
    <span className={styles.status}>
      <span className={circle} />
      <span className={styles.text}>{props.type}</span>
    </span>
  );
};

export default Status;
