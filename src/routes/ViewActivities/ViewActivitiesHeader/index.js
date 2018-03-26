import React from 'react';
import styles from './styles.css';

import { Typography } from './../../../components';

const { H2 } = Typography;

function ViewActivitiesHeader(props) {
  const { name } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H2>{name}’s Activities</H2>
      </div>
    </div>
  );
}

ViewActivitiesHeader.propTypes = {};

export default ViewActivitiesHeader;
