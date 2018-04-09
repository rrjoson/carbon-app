import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Switch } from './../../../components';

function HomeTable(props) {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.glocalid - b.glocalid,
    render: glocalid => <Link to={`/cases/${glocalid}`}>{glocalid}</Link>,
  }, {
    title: 'Position',
    dataIndex: 'position',
    sorter: (a, b) => a.position.length - b.position.length,
  }, {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.status.length - b.status.length,
  }, {
    title: 'Contact No.',
    dataIndex: 'contactNumber',
    sorter: (a, b) => a.contactNumber - b.contactNumber,
  }, {
    title: 'Status',
    dataIndex: 'status',
    render: () => <Switch defaultChecked onChange={() => {}} />,
  }];

  const dataSource = props.data.map((item, index) => {
    return {
      key: index,
      name: item.fullName,
      position: item.position,
      email: item.email,
      contactNumber: item.contactNumber,
    };
  });

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
}

HomeTable.propTypes = {};

export default HomeTable;
