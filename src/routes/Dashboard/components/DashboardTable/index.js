import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: 'Company',
  dataIndex: 'company',
}, {
  title: 'Status',
  dataIndex: 'status',
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
}];

const data = [];
for (let i = 0; i < 46; i += 1) {
  data.push({
    key: i,
    id: `A-${i}`,
    company: 'Ateneo',
    status: 'Overdue',
    activity: 'Onsite',
    issue: 'OS installation',
    open: '3',
    last_updated: '2017-12-31 • 6:24am',
    actions: 'View Edit',
  });
}

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
            selectedRowKeys: [...Array(46).keys()], // 0...45
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default DashboardTable;
