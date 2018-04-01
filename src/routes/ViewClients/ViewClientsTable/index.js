import React from 'react';

import styles from './styles.css';
import { Table, Link, Avatar, Tooltip } from './../../../components';

function ViewCasesTable(props) {
  const columns = [{
    title: 'Client',
    dataIndex: 'client',
    sorter: (a, b) => a.client.length - b.client.length,
  }, {
    title: 'Customer Name',
    dataIndex: 'customerName',
    sorter: (a, b) => a.customerName[0][0].length - b.customerName[0][0].length,
    render: (item) => {
      return item[0].map((text) => (
        <div>{text}</div>
      ));
    },
  }, {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email[0][0].length - b.email[0][0].length,
    render: (item) => {
      return item[0].map((text) => (
        <div>{text}</div>
      ));
    },
  }, {
    title: 'Contact No',
    dataIndex: 'contactNumber',
    sorter: (a, b) => a.contactNumber[0][0] - b.contactNumber[0][0],
    render: (item) => {
      return item[0].map((text) => (
        <div>{text}</div>
      ));
    },
  }, {
    title: 'Company Address',
    dataIndex: 'companyAddress',
    sorter: (a, b) => a.companyAddress.length - b.companyAddress.length,
  }, {
    title: 'Assigned AM',
    dataIndex: 'accountManager',
    sorter: (a, b) => a.accountManager.length - b.accountManager.length,
    render: accountManager => (
      <Tooltip title={accountManager}>
        <Avatar>{accountManager[0]}</Avatar>
      </Tooltip>
    ),
  }, {

    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => (
      <div>
        <Link to={`/clients/${record.client}`}>{text[0]} </Link>
        <Link to={`/clients/${record.client}/edit`}>{text[1]}</Link>
      </div>
    ),
  }];

  const dataSource = props.data.map((item, index) => (
    {
      key: index,
      client: item.accountName,
      customerName: item.customer_name,
      email: item.email,
      contactNumber: item.contact_number,
      companyAddress: item.company_address,
      accountManager: item.accountManager,
      actions: ['View', 'Edit'],
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
