import React from 'react';

import styles from './styles.css';
import { Typography } from './../../../components';

const { H2 } = Typography;

function AddUserHeader(props) {
  return (
    <div className={styles.addUserHeader}>
      <H2>Edit Account</H2>
    </div>
  );
}

AddUserHeader.propTypes = {};

export default AddUserHeader;
