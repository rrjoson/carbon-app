import React from 'react';
import { Table, Menu, Dropdown, Button, Icon } from 'antd';

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
    clients,
    engineers,
    vendors,
    onFilterCases,
  } = props;

  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <H4>Filter</H4>
      </div>
      <span className={styles.verticalLine} />
      <Button type="primary">All</Button>

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
        <Button style={{ marginLeft: 8 }}>
          Client <Icon type="down" />
        </Button>
      </Dropdown>

      <Dropdown
        overlay={
          <Menu onClick={({ item }) => onFilterCases({ key: 'status', value: item.props.children })}>
            <Menu.Item key="Ongoing">Ongoing</Menu.Item>
            <Menu.Item key="Resolved">Resolved</Menu.Item>
            <Menu.Item key="Pending (Client)">Pending (Client)</Menu.Item>
            <Menu.Item key="Pending (Glocal)">Pending (Glocal)</Menu.Item>
          </Menu>
        }
      >
        <Button style={{ marginLeft: 8 }}>
          Status <Icon type="down" />
        </Button>
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
        <Button style={{ marginLeft: 8 }}>
          Assigned SE <Icon type="down" />
        </Button>
      </Dropdown>

      <Dropdown
        overlay={
          <Menu onClick={({ item }) => onFilterCases({ key: 'severity', value: item.props.children })}>
            <Menu.Item key={1}>1 - Emergency</Menu.Item>
            <Menu.Item key={2}>2 - Critical</Menu.Item>
            <Menu.Item key={3}>3 - Major</Menu.Item>
            <Menu.Item key={4}>4 - Minor</Menu.Item>
          </Menu>
        }
      >
        <Button style={{ marginLeft: 8 }}>
          Severity <Icon type="down" />
        </Button>
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
        <Button style={{ marginLeft: 8 }}>
          Vendor <Icon type="down" />
        </Button>
      </Dropdown>

      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
        Product <Icon type="down" />
        </Button>
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
