import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import { Table, Link, Status, Avatar, Tooltip } from './../../../components';
import { getSeverityValue, getSystemsEngineers } from './../../../utils/data';

function HomeTable(props) {
  console.warn(props)
  const columns = [{
    title: 'ID',
    dataIndex: 'glocalId',
    render: (glocalid, record) => <Link to={`/cases/${glocalid}`}>{record.glocal_id}</Link>,
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
    render: (assignedSystemsEngineer) => {
      return assignedSystemsEngineer.map((systemsEngineer) => {
        return (
          <Tooltip title={systemsEngineer}>
            <Avatar>
              <Link to={`/activities/${systemsEngineer}`}>{systemsEngineer[0]}</Link>
            </Avatar>
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
    dataIndex: 'productName',
  }, {
    // TODO: REFACTOR
    title: 'Open',
    dataIndex: 'open',
    render: (date, record) => `${Math.abs(moment(date).diff(record.date_resolved ? moment(record.date_resolved) : moment(), 'days'))} days`,
  }, {
    title: 'Date Raised',
    dataIndex: 'dateRaised',
    render: date => moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY')
  }, {
    title: 'Vendor Case ID',
    dataIndex: 'vendorCaseId',
  }];

  const dataSource = props.data.map((item, index) => {
    return (
    {
      key: index,
      glocalId: item.glocalId,
      glocal_id: item.glocal_id,
      customer: item.customer,
      status: item.case_status,
      assignedSystemsEngineer: getSystemsEngineers(item.assignedsystemsengineer)
        ? [item.systemsEngineerLead].concat(...getSystemsEngineers(item.assignedsystemsengineer))
        : [item.systemsEngineerLead],
      severity: item.severity,
      productName: item.productName,
      open: item.dateRaised,
      dateResolved: item.date_resolved,
      dateRaised: item.dateRaised,
      vendorCaseId: item.vendorCaseId,
    }
    );
  });

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
