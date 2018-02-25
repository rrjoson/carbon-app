import React from 'react';

import styles from './styles.css';
import { Typography } from './../../../components';

const { H2 } = Typography;

function AddLicenseHeader(props) {
  return (
    <div className={styles.addLicenseHeader}>
      <H2>New License</H2>
    </div>
  );
}

AddLicenseHeader.propTypes = {};

export default AddLicenseHeader;
