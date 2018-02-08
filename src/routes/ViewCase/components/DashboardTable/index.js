import React, { Component } from 'react';
import { Table, Menu, Dropdown, Button, Icon } from 'antd';
import { Typography, Link, Status } from './../../../../components';

import styles from './styles.css';

const { H3 } = Typography;

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  render: id => <Link to="/">{id}</Link>,
}, {
  title: 'Company',
  dataIndex: 'company',
}, {
  title: 'Status',
  dataIndex: 'status',
  render: status => <Status type={status} />,
}, {
  title: 'Activity',
  dataIndex: 'activity',
}, {
  title: 'Issue / Purpose Of Visit',
  dataIndex: 'issue',
}, {
  title: 'Open',
  dataIndex: 'open',
}, {
  title: 'Last Updated',
  dataIndex: 'last_updated',
}, {
  title: 'Actions',
  dataIndex: 'actions',
  render: action => <Link to="/">{action}</Link>,
}];

const data = [];
for (let i = 0; i < 1; i += 1) {
  data.push({
    key: i,
    id: `A-${i}`,
    company: 'Ateneo',
    status: 'overdue',
    activity: 'Onsite',
    issue: 'OS installation',
    open: '3',
    last_updated: '2017-12-31 • 6:24am',
    actions: 'View Edit',
  });
}

const menu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

class DashboardTable extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(2).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    return (
      <div>
        <Table
          className={styles.table}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default DashboardTable;
