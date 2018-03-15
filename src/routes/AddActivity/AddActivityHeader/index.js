import React from 'react';

import { Typography } from './../../../components';

import styles from './styles.css';

const { H2 } = Typography;

function AddActivityHeader(props) {
  return (
    <div className={styles.addActivityHeader}>
      <H2>New Activity</H2>
    </div>
  );
}

AddActivityHeader.propTypes = {};

export default AddActivityHeader;
