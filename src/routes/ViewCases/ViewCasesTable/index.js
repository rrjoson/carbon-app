import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Status, Avatar, Tooltip } from './../../../components';
import { getSeverityValue } from './../../../utils/data';

function ViewCasesTable(props) {
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
    dataIndex: 'assignedSystemsEngineer',
    width: '120px',
    render: (assignedSystemsEngineer) => {
      return assignedSystemsEngineer.map((systemsEngineer) => {
        return (
          <Tooltip title={systemsEngineer}>
            <Avatar>{systemsEngineer[0][0]}</Avatar>
          </Tooltip>
        );
      });
    },
  }, {
    title: 'Severity',
    dataIndex: 'severity',
    width: '120px',
    render: severity => getSeverityValue(severity),
  }, {
    title: 'Case Title',
    dataIndex: 'casetitle',
  }, {
    title: 'Product',
    dataIndex: 'productname',
  }, {
    title: 'Open',
    dataIndex: 'open',
    render: date => `${Math.abs(moment(date).diff(moment(), 'days'))} days`,
  }, {
    title: 'Last Updated',
    dataIndex: 'lastupdated',
    render: date => moment(date, "YYYY-MM-DD").format('DD/MM/YYYY')
  }, {
    title: 'Date Raised',
    dataIndex: 'dateraised',
    render: date => moment(date, "YYYY-MM-DD").format('DD/MM/YYYY')
  }, {
    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => (
      <div>
        <Link to={`/cases/${record.glocalid}`}>{text[0]} </Link>
        <Link to={`/cases/${record.glocalid}/edit`}>{text[1]}</Link>
      </div>
    ),
  }];

  const dataSource = props.data.map((item, index) => (
    {
      key: index,
      glocalid: item.glocalId,
      customer: item.customer,
      status: item.case_status,
      assignedSystemsEngineer: item.assignedSystemsEngineer
        ? [[item.systemsEngineerLead]].concat(...item.assignedSystemsEngineer)
        : [[item.systemsEngineerLead]],
      severity: item.severity,
      casetitle: item.caseTitle,
      productname: item.productName,
      open: item.dateRaised,
      lastupdated: item.date_last_updated || item.dateRaised,
      dateraised: item.dateRaised,
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
