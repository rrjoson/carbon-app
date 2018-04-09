import React from 'react';

import styles from './styles.css';
import { Table, Switch } from './../../../components';

function HomeTable(props) {
  const { onToggleStatus } = props;

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name - b.name,
  }, {
    title: 'Position',
    dataIndex: 'position',
    sorter: (a, b) => a.position.length - b.position.length,
  }, {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
  }, {
    title: 'Contact No.',
    dataIndex: 'contactNumber',
    sorter: (a, b) => a.contactNumber[0][0] - b.contactNumber[0][0],
  }, {
    title: 'Status',
    dataIndex: 'isActive',
    render: (isActive, record) => <Switch checked={isActive} onChange={() => onToggleStatus(record.id, !isActive)} />,
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
