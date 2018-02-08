import React from 'react';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';

const { H2 } = Typography;

function Cases() {
  return (
    <div>
      <H2>New Case</H2>
      <DynamicFieldSet />
    </div>
  );
}

Cases.propTypes = {};

export default Cases;
