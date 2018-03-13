import React from 'react';

import { Typography } from './../../../components';

import styles from './styles.css';

const { H2 } = Typography;

function AddClientHeader(props) {
  return (
    <div className={styles.addClientHeader}>
      <H2>New Client</H2>
    </div>
  );
}

AddClientHeader.propTypes = {};

export default AddClientHeader;
