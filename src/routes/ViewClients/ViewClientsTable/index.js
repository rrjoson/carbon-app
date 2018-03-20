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
  }, {
    title: 'Email',
    dataIndex: 'email',
  }, {
    title: 'Contact No',
    dataIndex: 'contactNumber',
  }, {
    title: 'Company Address',
    dataIndex: 'companyAddress',
  }, {
    title: 'Assigned AM',
    dataIndex: 'accountManager',
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
      customerName: item.Customer_Name,
      email: item.Email,
      contactNumber: item.Contact_Number,
      companyAddress: item.company_address,
      accountManager: item.Assigned_AM,
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
