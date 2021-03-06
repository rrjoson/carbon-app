/* global window */
import React, { Fragment } from 'react';
import { connect } from 'dva';
import NProgress from 'nprogress';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'dva/router';
import { Helmet } from 'react-helmet';
import logo from './../assets/logo.png';

import { Header, Loader } from './../components';
import config from './../constants/config';
import styles from './App.css';

const { publicPages } = config;

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
  url: '/products/edit',
  icon: 'laptop',
  label: 'Products',
}, {
  url: '/vendors/edit',
  icon: 'shop',
  label: 'Vendors',
}, {
  url: '/licenses',
  icon: 'safety',
  label: 'Licenses',
}, {
  url: '/se-list',
  icon: 'profile',
  label: 'SE List',
}, {
  url: '/reports',
  icon: 'area-chart',
  label: 'Reports',
}, {
  url: '/accounts',
  icon: 'team',
  label: 'Accounts',
}];

let lastHref;

function App(props) {
  const {
    dispatch,
    location,
    children,
    loading,
    user,
  } = props;

  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

  const { href } = window.location;

  window.NProgress = NProgress;

  if (lastHref !== href) {
    NProgress.start();

    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }

  const selectedKeys = () => {
    const keys = [];

    menuItems.forEach((item) => {
      if (location.pathname.includes(item.url.split('/')[1])) {
        keys.push(item.label);
      }
    });

    return keys;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Loader fullScreen spinning={loading.effects['app/INITIALIZE']} />
      <Helmet>
        <link rel="icon" href={logo} type="image/x-icon" />
      </Helmet>
      {
        (publicPages && publicPages.includes(pathname))
        ? <div>{children}</div>
        : <Fragment>
          <Sider className={styles.sider} width="70">
            <img src={logo} className={styles.logo} role="presentation" alt="logo" />
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
          <Layout className={styles.layout}>
            <Header
              user={user.data}
              onSearchCases={data => dispatch({ type: 'cases/FETCH_CASES_BY_QUERY', payload: data })}
              onSearchClients={data => dispatch({ type: 'clients/FETCH_CLIENTS_BY_QUERY', payload: data })}
              onSearchLicenses={data => dispatch({ type: 'licenses/FETCH_ACTIVE_AND_EXPIRED_LICENSES_BY_QUERY', payload: data })}
              pathname={location.pathname}
              type="default"
            />
            <Content className={styles.content}>
              {children}
            </Content>
          </Layout>
        </Fragment>
      }
    </Layout>
  );
}

App.propTypes = {
};

export default withRouter(connect(({ app, loading, user }) => ({ app, loading, user }))(App));
