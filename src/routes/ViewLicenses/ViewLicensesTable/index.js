import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Status, Avatar, Tooltip, Expiration } from './../../../components';

function ViewCasesTable(props) {
  const columns = [{
    title: 'Client',
    dataIndex: 'client',
  }, {
    title: 'Vendor',
    dataIndex: 'vendor',
  }, {
    title: 'Product',
    dataIndex: 'product',
  }, {
    title: 'Expiration',
    dataIndex: 'dateEnd',
    render: dateEnd => <Expiration date={dateEnd} />,
  }, {
    title: 'Date Start',
    dataIndex: 'dateStart',
    render: date => moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
  }, {
    title: 'Date End',
    dataIndex: 'dateEnd',
    render: date => moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
  }, {
    title: 'Particulars',
    dataIndex: 'particulars',
  }, {
    title: 'Assigned AM',
    dataIndex: 'assignedAccountManager',
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
      expiration: 'This month',
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
