import React from 'react';
import styles from './styles.css';
import { Typography, Button } from './../../../components';

const { H2 } = Typography;

function AllCasesHeader(props) {
  return (
    <div>
      <H2>All Cases</H2>
      <Button>Add Case</Button>
    </div>
  );
}

AllCasesHeader.propTypes = {};

export default AllCasesHeader;
