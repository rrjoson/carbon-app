import React from 'react';
import styles from './styles.css';
import { Button } from 'antd';

import { Typography, Link } from './../../../components';

const { H2 } = Typography;

function ViewLicenseHeader(props) {
  const { licenseId } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H2>License {licenseId}</H2>
      </div>
      <div>
        <Link to={`/licenses/${licenseId}/edit`}>
          <Button className={styles.button}>Edit License</Button>
        </Link>
      </div>
    </div>
  );
}

ViewLicenseHeader.propTypes = {};

export default ViewLicenseHeader;
