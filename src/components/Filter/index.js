import React from 'react';
import { Table, Menu, Dropdown, Button, Icon } from 'antd';

import { getSeverityValue } from './../../utils/data';

import Typography from './../Typography';
import Link from './../Link';
import Status from './../Status';

import styles from './styles.css';

const { H4 } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

function Filter(props) {
  const {
    filters,
    clients,
    engineers,
    vendors,
    products,
    onFilterCases,
  } = props;

  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <H4>Filter</H4>
      </div>
      <span className={styles.verticalLine} />

      {
        (Object.entries(filters).length)
        ? <Button>All</Button>
        : <Button type="primary">All</Button>
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
            <Menu.Item key="Pending (Glocal)">Pending (Glocal)</Menu.Item>
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
          <Menu onClick={({ item }) => onFilterCases({ key: 'assignedSystemsEngineer', value: item.props.children })}>
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
            {filters.assignedSystemsEngineer} <Icon type="down" />
          </Button>
          : <Button style={{ marginLeft: 8 }}>
            Assigned SE <Icon type="down" />
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
          <Menu onClick={({ item }) => onFilterCases({ key: 'vendor', value: item.props.children })}>
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

      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
        Date Raised <Icon type="down" />
        </Button>
      </Dropdown>
    </div>
  );
}

Filter.propTypes = {};

export default Filter;
