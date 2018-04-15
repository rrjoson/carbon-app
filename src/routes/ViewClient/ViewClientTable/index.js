import React from 'react';

import styles from './styles.css';
import { Table, Link, Avatar, Tooltip, RestrictedComponent } from './../../../components';

function ViewClientTable(props) {
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
        <Avatar>{accountManager[0]}</Avatar>
      </Tooltip>
    ),
  }, {

    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => (
      <div>
        <Link to={`/clients/${record.client}`}>{text[0]} </Link>
        <RestrictedComponent action="UPDATE_CLIENT">
          <Link to={`/clients/${record.client}/edit`}>{text[1]}</Link>
        </RestrictedComponent>
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
        pagination={false}
      />
    </div>
  );
}

ViewClientTable.propTypes = {};

export default ViewClientTable;
