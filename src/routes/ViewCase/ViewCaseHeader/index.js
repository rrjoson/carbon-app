import React from 'react';
import styles from './styles.css';

import { Typography, Link, Button } from './../../../components';

const { H2 } = Typography;

function ViewCaseHeader(props) {
  const {
    glocalId,
    caseTitle,
    caseDescription,
  } = props;

  return (
    <div className={styles.viewCaseHeader}>
      <div className={styles.viewCaseHeader__section}>
        <div className={styles.viewCaseHeader__title}>
          <H2>{caseTitle}</H2>
        </div>
        <div className={styles.viewCaseHeader__actions}>
          <Link to={`/cases/${glocalId}/edit`}><Button>Edit Case</Button></Link>
        </div>
      </div>
      <div className={styles.viewCaseHeader__section}>
        <div className={styles.viewCaseHeader__description}>
          {caseDescription}
        </div>
      </div>
    </div>
  );
}

ViewCaseHeader.propTypes = {};

export default ViewCaseHeader;
