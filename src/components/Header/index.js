import React from 'react';
import { Layout, Row } from 'antd';
import styles from './styles.css';

import { H4 } from './../Typography';
import Button from './../Button';
import Avatar from './../Avatar';

const AntHeader = Layout.Header;

const Header = (props) => {
  return (
    <AntHeader {...props} className={styles.header}>
      <Row type="flex" justify="space-between" align="middle">
        <div>
          <H4>{props.title}</H4>
        </div>
        <div>
          <Button>New Case</Button>
          <Avatar>A</Avatar>
        </div>
      </Row>
    </AntHeader>
  );
};

export default Header;
