import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Status, Avatar } from './../../../../components';

function HomeTable(props) {
  const columns = [{
    title: 'Glo-cal ID',
    dataIndex: 'glocalid',
    render: glocalid => <Link to={`/cases/${glocalid}`}>{glocalid}</Link>,
  }, {
    title: 'Company',
    dataIndex: 'customer',
  }, {
    title: 'Status',
    dataIndex: 'status',
    render: status => <Status type={status} />,
  }, {
    title: 'Assigned SE',
    dataIndex: 'assignedsystemsengineer',
    render: assignedsystemsengineer => {
      return assignedsystemsengineer.map((systemengineer) => {
        return (<Avatar>{systemengineer[0][0]}</Avatar>)
      });
    },
  }, {
    title: 'Severity',
    dataIndex: 'severity',
  }, {
    title: 'Product',
    dataIndex: 'productname',
  }, {
    title: 'Open',
    dataIndex: 'open',
  }, {
    title: 'Date Raised',
    dataIndex: 'dateraised',
    render: date => moment(date, "YYYY-MM-DD").format('DD/MM/YYYY')
  // }, {
  //   title: 'Assigned AM',
  //   dataIndex: 'assignedaccountmanager',
  //   render: assignedaccountmanager => (<Avatar>{assignedaccountmanager[0]}</Avatar>),
  }];

  const dataSource = props.data.map((item, index) => {
    return (
      {
        key: index,
        glocalid: item.glocalid,
        customer: item.customer,
        status: item.case_status,
        assignedsystemsengineer: item.assignedsystemsengineer,
        severity: item.severity,
        productname: item.productname,
        open: '3 days ago',
        dateraised: item.dateraised,
        assignedaccountmanager: item.assignedaccountmanager,
      }
    );
  })

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

HomeTable.propTypes = {};

export default HomeTable;
