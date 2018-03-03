import React from 'react';
import styles from './styles.css';
import { Typography } from './../../../components';

const { H2 } = Typography;

function AllCasesHeader(props) {
  return (
    <div>
      <H2>Edit Case</H2>
    </div>
  );
}

AllCasesHeader.propTypes = {};

export default AllCasesHeader;
