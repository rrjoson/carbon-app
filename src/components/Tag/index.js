import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';

const Tag = (props) => {
  const { children } = props;
  const type = children.toLowerCase();

  const tagStyle = classnames({
    [styles.tag]: true,
    [styles.remote]: type.includes('remote'),
    [styles.onsite]: type.includes('onsite'),
    [styles.poc]: type.includes('poc'),
    [styles.implement]: type.includes('implement'),
  });

  return (
    <div className={tagStyle}>
      {children}
    </div>
  );
};

export default Tag;
