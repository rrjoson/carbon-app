import React from 'react';
import styles from './styles.css';
import { Button } from 'antd';

import { Typography, Link } from './../../../components';

const { H2 } = Typography;

function ViewClientHeader(props) {
  const { accountName } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H2>{accountName}</H2>
      </div>
      <div>
        <Link to={`/clients/${accountName}/edit`}>
          <Button className={styles.button}>Edit Client</Button>
        </Link>
      </div>
    </div>
  );
}

ViewClientHeader.propTypes = {};

export default ViewClientHeader;
