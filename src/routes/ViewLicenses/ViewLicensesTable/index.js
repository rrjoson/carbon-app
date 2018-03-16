import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Status, Avatar, Tooltip } from './../../../components';

function ViewCasesTable(props) {
  const columns = [{
    title: 'licenseid',
    dataIndex: 'licenseid',
  }, {
    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => (
      <div>
        <Link to={`/clients/${record.licenseid}`}>{text[0]} </Link>
        <Link to={`/clients/${record.licenseid}/edit`}>{text[1]}</Link>
      </div>
    ),
  }];

  const dataSource = props.data.map((item, index) => (
    {
      key: index,
      licenseid: item.licenseid,
      actions: ['View', 'Edit']
    }
  ));

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
}

ViewCasesTable.propTypes = {};

export default ViewCasesTable;
