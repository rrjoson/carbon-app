import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Expiration, Avatar, Tooltip } from './../../../components';

function ViewCasesTable(props) {
  const columns = [{
    title: 'Client',
    dataIndex: 'client',
    sorter: (a, b) => a.client.length - b.client.length,
  }, {
    title: 'Vendor',
    dataIndex: 'vendor',
    sorter: (a, b) => a.vendor.length - b.vendor.length,
  }, {
    title: 'Product',
    dataIndex: 'product',
    sorter: (a, b) => a.product.length - b.product.length,
  }, {
    title: 'Expiration',
    dataIndex: 'dateEnd',
    sorter: (a, b) => moment(a.dateEnd, 'YYYY-MM-DD').diff(moment(b.dateEnd, 'YYYY-MM-DD')),
    render: dateEnd => <Expiration date={dateEnd} />,
  }, {
    title: 'Date Start',
    dataIndex: 'dateStart',
    sorter: (a, b) => moment(a.dateStart, 'YYYY-MM-DD').diff(moment(b.dateStart, 'YYYY-MM-DD')),
    render: date => moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
  }, {
    title: 'Date End',
    dataIndex: 'dateEnd',
    sorter: (a, b) => moment(a.dateEnd, 'YYYY-MM-DD').diff(moment(b.dateEnd, 'YYYY-MM-DD')),
    render: date => moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
  }, {
    title: 'Particulars',
    dataIndex: 'particulars',
    sorter: (a, b) => a.particulars.length - b.particulars.length,
  }, {
    title: 'Assigned AM',
    dataIndex: 'assignedAccountManager',
    sorter: (a, b) => a.assignedAccountManager.length - b.assignedAccountManager.length,
    render: assignedaccountmanager => (
      <Tooltip title={assignedaccountmanager}>
        <Avatar>{assignedaccountmanager[0]}</Avatar>
      </Tooltip>
    ),
  }, {
    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => (
      <div>
        <Link to={`/licenses/${record.licenseId}`}>{text[0]} </Link>
        <Link to={`/licenses/${record.licenseId}/edit`}>{text[1]}</Link>
      </div>
    ),
  }];

  const dataSource = props.data.map((item, index) => (
    {
      key: index,
      licenseId: item.licenseId,
      client: item.client,
      vendor: item.vendor,
      product: item.productName,
      dateStart: item.date_start,
      dateEnd: item.date_end,
      particulars: item.particulars,
      assignedAccountManager: item.assignedAM,
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
