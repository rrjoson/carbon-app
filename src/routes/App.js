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
  url: '/clients/add',
  icon: 'idcard',
  label: 'Clients',
}, {
  url: '/products/edit',
  icon: 'laptop',
  label: 'Products',
}, {
  url: '/vendors/edit',
  icon: 'shop',
  label: 'Vendors',
}, {
  url: '/licenses/add',
  icon: 'safety',
  label: 'Licenses',
}];

function App({ location, children }) {
  const selectedKeys = () => {
    const keys = [];

    menuItems.forEach((item) => {
      if (location.pathname.includes(item.url.split('/')[1])) {
        keys.push(item.label);
      }
    })

    return keys;
  }

  console.warn('selectedKeys', selectedKeys())

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className={styles.sider} width="70">
        <img src="http://antd-admin.zuiidea.com/logo.svg" className={styles.logo} role="presentation" alt="logo" />
        <Menu
          theme="dark"
          selectedKeys={selectedKeys()}
        >
          {
            menuItems.map((item) => {
              return (
                <Menu.Item key={item.label}>
                  <Icon type={item.icon} />
                  <Link to={item.url || '#'}>{item.label}</Link>
                </Menu.Item>
              );
            })
          }
        </Menu>
      </Sider>
      <Layout>
        <Header
          pathname={location.pathname}
          type="default"
        />
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
