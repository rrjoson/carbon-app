import React from 'react';
import classnames from 'classnames';

import Avatar from '../Avatar';
import Link from '../Link';

import styles from './styles.css';

const Activity = (props) => {
  const {
    item,
    open,
    onClick,
  } = props;

  const activityStyle = classnames({
    [styles.activity]: true,
    [styles.activityOpen]: open,
  });

  return (
    <div className={activityStyle}>
      <div className={styles.activity__body}>
        <div className={styles.activity__section}>
          <div className={styles.activity__sectionItem}>
            <div className={styles.activity__avatar}>
              <Avatar>
                {item.engineersurname.split(' ')[0][0]}
              </Avatar>
            </div>
            <div className={styles.name}>
              {item.engineersurname.split(' ')[0]}
            </div>
          </div>
        </div>

        <div className={styles.activity__section}>
          <div className={styles.activity__sectionItem}>
            <div className={styles.activity__purpose}>
              {item.purposeofvisit}
            </div>
            <div className={styles.activity__time}>
              2017-12-31 • 12:53pm • 4 hours
            </div>
          </div>

          <div className={styles.activity__sectionItem}>
            <div className={styles.activity__serviceNumber}>
              SR 2192
            </div>
            <div className={styles.activity__type}>
              {item.typeofactivity}
            </div>
          </div>

          <div className={styles.activity__sectionItem}>
            <Link to="/">Edit</Link>
            <Link to="/">Delete</Link>
          </div>
        </div>

        <div className={styles.activity__section}>
          <div className={styles.activity__sectionTitle}>
            Activity Performed
          </div>
          <div className={styles.activity__sectionContent}>
            {item.activityperformed}
          </div>
          <div className={styles.activity__sectionTitle}>
            Recommendation
          </div>
          <div className={styles.activity__sectionContent}>
            {item.recommendations}
          </div>
        </div>
      </div>
      <div className={styles.activity__button} onClick={onClick}>
        <div className={styles.activity__buttonText}>
          {open ? 'See Less' : 'See More'}
        </div>
      </div>
    </div>
  );
};

export default Activity;
