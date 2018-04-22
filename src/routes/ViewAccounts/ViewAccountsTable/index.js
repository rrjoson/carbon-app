import React from 'react';

import styles from './styles.css';
import { Table, Switch, Link } from './../../../components';

function HomeTable(props) {
  const { onToggleStatus } = props;

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
    sorter: (a, b) => a.name - b.name,
  }, {
    title: 'Position',
    dataIndex: 'position',
    width: '20%',
    sorter: (a, b) => a.position.length - b.position.length,
  }, {
    title: 'Email',
    dataIndex: 'email',
    width: '20%',
    sorter: (a, b) => a.email.length - b.email.length,
  }, {
    title: 'Contact No.',
    dataIndex: 'contactNumber',
    width: '20%',
    sorter: (a, b) => a.contactNumber[0][0] - b.contactNumber[0][0],
  }, {
    title: 'Status',
    dataIndex: 'isActive',
    width: '10%',
    render: (isActive, record) => record.position !== 'Managing Director' && <Switch checked={isActive} onChange={() => onToggleStatus(record.id, !isActive)} />,
  }, {
    title: 'Actions',
    dataIndex: 'actions',
    width: '10%',
    render: (text, record) => (
      <div>
        <Link to={`/accounts/${record.id}/edit`}>{text[0]} </Link>
      </div>
    ),
  }];

  const dataSource = props.data.map((item, index) => {
    return {
      key: index,
      id: item.userid,
      name: item.fullName,
      position: item.position,
      email: item.email,
      contactNumber: item.contactNumber,
      isActive: item.is_active,
      actions: ['Edit'],
    };
  });

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={dataSource.length !== 1}
      />
    </div>
  );
}

HomeTable.propTypes = {};

export default HomeTable;
