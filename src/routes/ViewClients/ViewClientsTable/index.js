import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Status, Avatar, Tooltip } from './../../../components';

function ViewCasesTable(props) {
  const columns = [{
    title: 'Client',
    dataIndex: 'accountname',
  }, {
    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => (
      <div>
        <Link to={`/clients/${record.accountname}`}>{text[0]} </Link>
        <Link to={`/clients/${record.accountname}/edit`}>{text[1]}</Link>
      </div>
    ),
  }];

  const dataSource = props.data.map((item, index) => (
    {
      key: index,
      accountname: item.accountname,
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
