import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'dva/router';

import { Header } from './../components';

import styles from './App.css';

const { Content, Sider } = Layout;

const menuItems = [{
  url: '/home',
  icon: 'home',
  label: 'Home',
}, {
  url: '/cases/all',
  icon: 'database',
  label: 'Cases',
}, {
  url: '/clients',
  icon: 'idcard',
  label: 'Clients',
}, {
  url: '/products',
  icon: 'laptop',
  label: 'Products',
}, {
  url: '/vendors',
  icon: 'shop',
  label: 'Vendors',
}, {
  url: '/licenses',
  icon: 'safety',
  label: 'Licenses',
}];

const getHeaderTitle = (pathname) => {
  if (pathname === '/home') return 'Home';
  if (pathname === '/cases') return 'Cases';
  if (pathname === '/clients') return 'Clients';
  if (pathname === '/products') return 'Products';
  if (pathname === '/vendors') return 'Vendors';
  if (pathname === '/licenses') return 'Licenses';
};

function App({ location, children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className={styles.sider} width="70">
        <img src="http://antd-admin.zuiidea.com/logo.svg" className={styles.logo} role="presentation" alt="logo" />
        <Menu theme="dark" defaultSelectedKeys={[location.pathname]}>
          {
            menuItems.map((item) => {
              return (
                <Menu.Item key={item.url}>
                  <Icon type={item.icon} />
                  <Link to={item.url || '#'}>{item.label}</Link>
                </Menu.Item>
              );
            })
          }
        </Menu>
      </Sider>
      <Layout>
        <Header title={getHeaderTitle(location.pathname)} type="default" />
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
