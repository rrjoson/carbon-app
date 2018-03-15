import React from 'react';
import styles from './styles.css';
import { Typography } from './../../../components';

const { H2 } = Typography;

function AddCaseHeader(props) {
  return (
    <div>
      <H2>New Case</H2>
    </div>
  );
}

AddCaseHeader.propTypes = {};

export default AddCaseHeader;
