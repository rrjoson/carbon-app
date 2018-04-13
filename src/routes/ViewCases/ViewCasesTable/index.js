import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Status, Avatar, Tooltip } from './../../../components';
import { getSeverityValue } from './../../../utils/data';

function ViewCasesTable(props) {
  const columns = [{
    title: 'ID',
    dataIndex: 'glocalid',
    sorter: (a, b) => a.glocalid - b.glocalid,
    render: glocalid => <Link to={`/cases/${glocalid}`}>{glocalid}</Link>,
  }, {
    title: 'Company',
    dataIndex: 'customer',
    sorter: (a, b) => a.customer.length - b.customer.length,
  }, {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    render: status => <Status type={status} />,
  }, {
    title: 'Assigned SE',
    dataIndex: 'assignedSystemsEngineer',
    width: '120px',
    sorter: (a, b) => a.assignedSystemsEngineer.length - b.assignedSystemsEngineer.length,
    render: (assignedSystemsEngineer) => {
      return assignedSystemsEngineer.map((systemsEngineer) => {
        return (
          <Tooltip title={systemsEngineer}>
            <Avatar>
              <Link to={`/activities/${systemsEngineer}`}>{systemsEngineer[0][0]}</Link>
            </Avatar>
          </Tooltip>
        );
      });
    },
  }, {
    title: 'Severity',
    dataIndex: 'severity',
    width: '120px',
    sorter: (a, b) => a.severity - b.severity,
    render: severity => getSeverityValue(severity),
  }, {
    title: 'Case Title',
    dataIndex: 'casetitle',
    sorter: (a, b) => a.casetitle.length - b.casetitle.length,
  }, {
    title: 'Product',
    dataIndex: 'productname',
    sorter: (a, b) => a.productname.length - b.productname.length,
  }, {
    // TODO: REFACTOR
    title: 'Open',
    dataIndex: 'open',
    sorter: (a, b) => Math.abs(moment(a.open).diff(moment(), 'days')) - Math.abs(moment(b.open).diff(moment(), 'days')),
    render: (date, record) => `${Math.abs(moment(date).diff(record.date_resolved ? moment(record.date_resolved) : moment(), 'days'))} days`,
  }, {
    title: 'Last Updated',
    dataIndex: 'lastupdated',
    sorter: (a, b) => moment(a.lastupdated, 'YYYY-MM-DD').diff(moment(b.lastupdated, 'YYYY-MM-DD')),
    render: date => `${Math.abs(moment(date).diff(moment(), 'days'))} days`,
  }, {
    title: 'Date Raised',
    dataIndex: 'dateraised',
    sorter: (a, b) => moment(a.dateraised, 'YYYY-MM-DD').diff(moment(b.dateraised, 'YYYY-MM-DD')),
    render: date => moment(date, "YYYY-MM-DD").format('MM/DD/YYYY')
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
      dateResolved: item.date_resolved,
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
