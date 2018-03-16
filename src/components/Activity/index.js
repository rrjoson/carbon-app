import React from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';

import Avatar from '../Avatar';
import Link from '../Link';
import Tooltip from '../Tooltip';
import Tag from '../Tag';

import styles from './styles.css';

const Activity = (props) => {
  const {
    item,
    open,
    onClick,
  } = props;

  const activityStyle = classnames({
    [styles['activity']]: true,
    [styles['activity--open']]: open,
  });

  return (
    <div className={activityStyle}>
      <div className={styles.activity__body}>

        {/* ENGINEERS */}
        <div className={styles['activity__engineers']}>
          <div className={styles['activity__engineer']}>
            <div className={styles['activity__avatar']}>
              <Tooltip title={item.engineersurname}>
                <Avatar>
                  {item.engineersurname.split(' ')[0][0]}
                </Avatar>
              </Tooltip>
            </div>
            <div className={styles.activity__engineerName}>
              {item.engineersurname.split(' ')[0]}
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className={styles.activity__info}>

          {/* META INFORMATION */}
          <div className={styles.activity__meta}>
            <div className={styles.activity__metaLeft}>
              <div className={styles.activity__purpose}>
                {item.purposeofvisit}
              </div>
              <div className={styles.activity__time}>
                2017-12-31 • 12:53pm • 4 hours
              </div>
            </div>
            <div className={styles.activity__metaRight}>
              <Tag>
                {item.typeofactivity}
              </Tag>
            </div>
          </div>

          {/* BUTTONS */}
          <div className={styles.activity__actions}>
            <Link to="/">Edit</Link>
            <Link to="/">Delete</Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className={styles.activity__content}>
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

      {/* SEE MORE / SEE LESS */}
      <div className={styles.activity__button} onClick={onClick}>
        <div className={styles.activity__buttonText}>
          {
            open
            ? <div>See Less <Icon type="up" /></div>
            : <div>See More <Icon type="down" /></div>
          }
        </div>
      </div>
    </div>
  );
};

export default Activity;
