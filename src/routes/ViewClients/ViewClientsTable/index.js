import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Status, Avatar, Tooltip } from './../../../components';

function ViewCasesTable(props) {
  const columns = [{
    title: 'Client',
    dataIndex: 'client',
  }, {
    title: 'Customer Name',
    dataIndex: 'customerName',
    render: (item) => {
      return item[0].map((text) => (
        <div>{text}</div>
      ));
    },
  }, {
    title: 'Email',
    dataIndex: 'email',
    render: (item) => {
      return item[0].map((text) => (
        <div>{text}</div>
      ));
    },
  }, {
    title: 'Contact No',
    dataIndex: 'contactNumber',
    render: (item) => {
      return item[0].map((text) => (
        <div>{text}</div>
      ));
    },
  }, {
    title: 'Company Address',
    dataIndex: 'companyAddress',
  }, {
    title: 'Assigned AM',
    dataIndex: 'accountManager',
    render: accountManager => (
      <Tooltip title={accountManager}>
        <Avatar>{accountManager}</Avatar>
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
      accountManager: item.Assigned_AM,
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
