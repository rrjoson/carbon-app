import React from 'react';
import styles from './styles.css';
import { Typography, Button, Link } from './../../../components';

const { H2 } = Typography;

function AllCasesHeader(props) {
  return (
    <div>
      <H2>All Cases</H2>
      <Link to="/cases/add">
        <Button>Add Case</Button>
      </Link>
    </div>
  );
}

AllCasesHeader.propTypes = {};

export default AllCasesHeader;
