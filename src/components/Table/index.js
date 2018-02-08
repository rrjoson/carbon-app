import React from 'react';
import { Table as AntTable } from 'antd';
import styles from './styles.css';

function Table(props) {
  return (
    <AntTable {...props} className={styles.table} />
  );
};

export default Table;
