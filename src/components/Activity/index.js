import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { Icon, Modal } from 'antd';

import { generatePDF } from 'utils/pdf';

import Avatar from '../Avatar';
import Link from '../Link';
import Tooltip from '../Tooltip';
import Tag from '../Tag';

import styles from './styles.css';

const Activity = (props) => {
  const {
    item,
    open,
    glocalId,
    onClick,
  } = props;

  const activityStyle = classnames({
    [styles.activity]: true,
    [styles['activity--open']]: open,
  });

  const showConfirmDeleteModal = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        props.onDelete();
      },
    });
  };

  return (
    <div className={activityStyle}>
      <div className={styles.activity__body}>

        {/* ENGINEERS */}
        <div className={styles.activity__engineers}>
          {item.assignedSystemsEngineer.map((engineer) => {
            return (
              <div className={styles.activity__engineer}>
                <div className={styles.activity__avatar}>
                  <Tooltip title={engineer[0]}>
                    <Avatar>
                      <Link to={`/activities/${engineer[0]}`}>{engineer[0].split(' ')[0][0]}</Link>
                    </Avatar>
                  </Tooltip>
                </div>
                <div className={styles.activity__engineerName}>
                  {engineer[0].split(' ')[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* INFO */}
        <div className={styles.activity__info}>

          {/* META INFORMATION */}
          <div className={styles.activity__meta}>
            <div className={styles.activity__metaLeft}>
              <div className={styles.activity__purpose}>
                {item.purposeOfVisit}
              </div>
              <div className={styles.activity__time}>
                {/* TODO: REFACTOR */}
                {moment(item.timeIn).format('YYYY-MM-DD • hh:mma')} • {Math.floor(moment.duration(moment(item.timeOuts).diff(moment(item.timeIn))).asHours())} hours
              </div>
            </div>
            <div className={styles.activity__metaRight}>
              <Tag>
                {item.typeOfActivity}
              </Tag>
            </div>
          </div>

          {/* BUTTONS */}
          <div className={styles.activity__actions}>
            <Link to={`/cases/${glocalId}/activities/${item.activityNo}/edit`}>Edit</Link>
            <Link onClick={() => generatePDF(item)} to="#">Export to PDF</Link>
            <Link onClick={() => showConfirmDeleteModal()} to="#">Delete</Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className={styles.activity__content}>
          <div className={styles.activity__sectionTitle}>
            Activity Performed
          </div>
          <div className={styles.activity__sectionContent}>
            {item.activityPerformed}
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
