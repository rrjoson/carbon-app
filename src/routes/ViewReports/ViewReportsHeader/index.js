import React from 'react';
import moment from 'moment';
import usersSvg from 'assets/users.svg';

import styles from './styles.css';

function ViewReportsHeader(props) {
  const { filters } = props;

  return (
    <div className={styles.viewReportsHeader}>
      {console.warn(filters)}
      <If condition={filters.timePeriod && filters.timePeriod.length}>
        Stats for {moment(filters.timePeriod[0][0], 'MM/DD/YYYY').format('LL')} - {moment(filters.timePeriod[0][1], 'MM/DD/YYYY').format('LL')}
      </If>
    </div>
  );
}

ViewReportsHeader.propTypes = {};

export default ViewReportsHeader;
