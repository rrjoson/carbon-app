import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';

const Status = (props) => {
  const { type = '' } = props;

  const circle = classnames({
    [styles.circle]: true,
    [styles.red]: type.includes('Overdue'),
    [styles.gray]: type.includes('Open'),
    [styles.green]: type.includes('Resolved'),
    [styles.orange]: type.includes('Pending'),
    [styles.blue]: type.includes('Ongoing'),
  });

  return (
    <span className={styles.status}>
      <span className={circle} />
      <span className={styles.text}>{props.type}</span>
    </span>
  );
};

export default Status;
