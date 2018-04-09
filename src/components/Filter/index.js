import React from 'react';
import moment from 'moment';
import { Menu, Dropdown, Button, Icon, DatePicker } from 'antd';

import { getSeverityValue } from './../../utils/data';

import Typography from './../Typography';

import styles from './styles.css';

const { H4 } = Typography;

function Filter(props) {
  const {
    filters,
    clients,
    engineers,
    vendors,
    products,
    onFilterCases,
    onResetFilters,
    onSelectVendor,
  } = props;

  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <H4>Filter</H4>
      </div>
      <span className={styles.verticalLine} />

      {
        (Object.entries(filters).length)
        ? <Button onClick={() => onResetFilters()}>All</Button>
        : <Button onClick={() => onResetFilters()} type="primary">All</Button>
      }

      <Dropdown
        overlay={
          <Menu onClick={({ item }) => onFilterCases({ key: 'customer', value: item.props.children })}>
            {
              clients.map((client, index) => {
                return <Menu.Item key={index}>{client.accountName}</Menu.Item>;
              })
            }
          </Menu>
        }
      >
        {
          (filters.customer)
          ? <Button style={{ marginLeft: 8 }} type="primary">
            {filters.customer} <Icon type="down" />
          </Button>
          : <Button style={{ marginLeft: 8 }}>
            Client <Icon type="down" />
          </Button>
        }
      </Dropdown>

      <Dropdown
        overlay={
          <Menu onClick={({ item }) => onFilterCases({ key: 'case_status', value: item.props.children })}>
            <Menu.Item key="Ongoing">Ongoing</Menu.Item>
            <Menu.Item key="Resolved">Resolved</Menu.Item>
            <Menu.Item key="Pending (Client)">Pending (Client)</Menu.Item>
            <Menu.Item key="Pending (Glo-cal)">Pending (Glo-cal)</Menu.Item>
          </Menu>
        }
      >
        {
          (filters.case_status)
          ? <Button style={{ marginLeft: 8 }} type="primary">
            {filters.case_status} <Icon type="down" />
          </Button>
          : <Button style={{ marginLeft: 8 }}>
            Status <Icon type="down" />
          </Button>
        }
      </Dropdown>

      <Dropdown
        overlay={
          <Menu onClick={({ item }) => onFilterCases({ key: 'assignedSystemsEngineer', value: `{${item.props.children}}` })}>
            {
              engineers.map((engineer, index) => {
                return <Menu.Item key={index}>{engineer.fullName}</Menu.Item>;
              })
            }
          </Menu>
        }
      >
        {
          (filters.assignedSystemsEngineer)
          ? <Button style={{ marginLeft: 8 }} type="primary">
            {/* HACK */}
            {filters.assignedSystemsEngineer.replace(/[{()}]/g, '')} <Icon type="down" />
          </Button>
          : <Button style={{ marginLeft: 8 }}>
            Assigned SE <Icon type="down" />
          </Button>
        }
      </Dropdown>


      <Dropdown
        overlay={
          <Menu onClick={({ item }) => onFilterCases({ key: 'systemsEngineerLead', value: item.props.children })}>
            {
              engineers.map((engineer, index) => {
                return <Menu.Item key={index}>{engineer.fullName}</Menu.Item>;
              })
            }
          </Menu>
        }
      >
        {
          (filters.systemsEngineerLead)
          ? <Button style={{ marginLeft: 8 }} type="primary">
            {/* HACK */}
            {filters.systemsEngineerLead.replace(/[{()}]/g, '')} <Icon type="down" />
          </Button>
          : <Button style={{ marginLeft: 8 }}>
            SE Lead <Icon type="down" />
          </Button>
        }
      </Dropdown>

      <Dropdown
        overlay={
          <Menu onClick={({ item }) => onFilterCases({ key: 'severity', value: item.props.eventKey })}>
            <Menu.Item key={1}>1 - Emergency</Menu.Item>
            <Menu.Item key={2}>2 - Critical</Menu.Item>
            <Menu.Item key={3}>3 - Major</Menu.Item>
            <Menu.Item key={4}>4 - Minor</Menu.Item>
          </Menu>
        }
      >
        {
          (filters.severity)
          ? <Button style={{ marginLeft: 8 }} type="primary">
            {getSeverityValue(filters.severity)} <Icon type="down" />
          </Button>
          : <Button style={{ marginLeft: 8 }}>
            Severity <Icon type="down" />
          </Button>
        }
      </Dropdown>

      <Dropdown
        overlay={
          <Menu
            onClick={({ item }) => {
              onSelectVendor(item.props.children);
              onFilterCases({ key: 'vendor', value: item.props.children });
            }}
          >
            {
              vendors.map((vendor, index) => {
                return <Menu.Item key={index}>{vendor.principal}</Menu.Item>;
              })
            }
          </Menu>
        }
      >
        {
          (filters.vendor)
          ? <Button style={{ marginLeft: 8 }} type="primary">
            {filters.vendor} <Icon type="down" />
          </Button>
          : <Button style={{ marginLeft: 8 }}>
            Vendor <Icon type="down" />
          </Button>
        }
      </Dropdown>

      <Dropdown
        overlay={
          <Menu onClick={({ item }) => onFilterCases({ key: 'productName', value: item.props.children })}>
            {
              products.map((product, index) => {
                return <Menu.Item key={index}>{product.productName}</Menu.Item>;
              })
            }
          </Menu>
        }
      >
        {
          (filters.productName)
          ? <Button style={{ marginLeft: 8 }} type="primary">
            {filters.productName} <Icon type="down" />
          </Button>
          : <Button style={{ marginLeft: 8 }}>
            Product <Icon type="down" />
          </Button>
        }
      </Dropdown>

      <Dropdown
        overlay={
          <div>
            <DatePicker
              allowClear={false}
              onChange={date => onFilterCases({ key: 'dateRaised', value: moment(date).format('MM/DD/YYYY') })}
              format={'MM/DD/YYYY'}
            />
          </div>
        }
      >
        {
          (filters.dateRaised)
          ? <Button style={{ marginLeft: 8 }} type="primary">
            {filters.dateRaised} <Icon type="down" />
          </Button>
          : <Button style={{ marginLeft: 8 }}>
            Date Raised <Icon type="down" />
          </Button>
        }
      </Dropdown>
    </div>
  );
}

Filter.propTypes = {};

export default Filter;
