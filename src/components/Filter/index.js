import React from 'react';
import { Table, Menu, Dropdown, Button, Icon } from 'antd';

import Typography from './../Typography';
import Link from './../Link';
import Status from './../Status';

import styles from './styles.css';

const { H3 } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

function Filter(props) {
  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <H3>Filter</H3>
      </div>
      <span className={styles.verticalLine} />
      <Button type="primary">All</Button>

      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
          Client <Icon type="down" />
        </Button>
      </Dropdown>

      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
        Status <Icon type="down" />
        </Button>
      </Dropdown>

      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
        Assigned SE <Icon type="down" />
        </Button>
      </Dropdown>

      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
        Severity <Icon type="down" />
        </Button>
      </Dropdown>

      <Dropdown overlay={menu}>
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
