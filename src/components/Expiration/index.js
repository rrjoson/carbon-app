import React from 'react';
import moment from 'moment';

import styles from './styles.css';

const WEEK = 7;
const MONTH = 30;
const YEAR = 365;

// TODO: REFACTOR
const Expiration = (props) => {
  const { date } = props;

  const days = Math.abs(moment(date).diff(moment(), 'days'));
  const months = days / MONTH;
  const years = days / YEAR;

  const isOneMonth = (days % MONTH) === 0;
  const isOneYear = (days % YEAR) === 0;

  if (days <= 0) return <div className={styles.expired}>EXPIRED</div>;
  if (days < WEEK) return <div>This week</div>;
  if (days < MONTH) return <div>This month</div>;

  if (days < YEAR && isOneMonth) return <div>{`${months} ${months > 1 ? 'months' : 'month'}`}</div>;
  if (days < YEAR && !isOneMonth) return <div>{`${Math.floor(months) + 1} ${months > 1 ? 'months' : 'month'}`}</div>;

  if (days >= YEAR && isOneYear) return <div>{`${years} ${years > 1 ? 'years' : 'year'}`}</div>;
  if (days >= YEAR && !isOneYear) return <div>{`${Math.floor(years) + 1} ${years > 1 ? 'years' : 'year'}`}</div>;
};

export default Expiration;
