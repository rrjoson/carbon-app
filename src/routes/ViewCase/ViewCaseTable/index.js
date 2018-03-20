import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Status, Avatar, Tooltip } from './../../../components';
import { getSeverityValue } from './../../../utils/data';

function HomeTable(props) {
  const columns = [{
    title: 'ID',
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
        return (
          <Tooltip title={systemengineer}>
            <Avatar>{systemengineer[0][0]}</Avatar>
          </Tooltip>
        );
      });
    },
  }, {
    title: 'Severity',
    dataIndex: 'severity',
    render: severity => getSeverityValue(severity),
  }, {
    title: 'Product',
    dataIndex: 'productname',
  }, {
    title: 'Open',
    dataIndex: 'open',
    render: date => `${Math.abs(moment(date).diff(moment(), 'days'))} days`,
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
        glocalid: item.glocalId,
        customer: item.customer,
        status: item.case_status,
        assignedsystemsengineer: item.assignedSystemsEngineer,
        severity: item.severity,
        productname: item.productName,
        open: item.dateRaised,
        dateraised: item.dateRaised,
        assignedaccountmanager: item.assignedAccountManager,
      }
    );
  })

  return (
    <div className={styles.viewCaseTable}>
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
