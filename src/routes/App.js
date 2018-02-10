import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, Row, Button } from 'antd';
import { Link, withRouter } from 'dva/router';

import { Typography } from './../components';

import styles from './App.css';

const { Header, Content, Sider } = Layout;
const { H4 } = Typography;

function App({ location, children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className={styles.sider} width="70">
        <img src="http://antd-admin.zuiidea.com/logo.svg" className={styles.logo} role="presentation" alt="logo" />
        <Menu theme="dark" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/dashboard">
            <Icon type="home" />
            <Link to={'/dashboard' || '#'}>Home</Link>
          </Menu.Item>
          <Menu.Item key="/cases">
            <Icon type="database" />
            <Link to={'/cases' || '#'}>Cases</Link>
          </Menu.Item>
          <Menu.Item key="/clients">
            <Icon type="idcard" />
            <Link to={'/clients' || '#'}>Clients</Link>
          </Menu.Item>
          <Menu.Item key="/products">
            <Icon type="laptop" />
            <Link to={'/products' || '#'}>Products</Link>
          </Menu.Item>
          <Menu.Item key="/vendors">
            <Icon type="shop" />
            <Link to={'/vendors' || '#'}>Vendors</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Row type="flex" justify="space-between" align="middle">
            <div>
              <H4>{location.pathname}</H4>
            </div>
            <div>
              <Button>New Case</Button>
              <span className={styles.badge}>A</span>
            </div>
          </Row>
        </Header>
        <Content style={{ background: '#fff', padding: '28px 23px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

App.propTypes = {
};


export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App));
