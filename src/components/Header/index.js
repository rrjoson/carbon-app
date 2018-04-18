import React from 'react';
import { Layout, Icon, Dropdown, Menu } from 'antd';
import styles from './styles.css';

import { H5 } from './../Typography';

import Button from './../Button';
import Avatar from './../Avatar';
import Link from './../Link';
import Search from './../Search';

import RestrictedComponent from './../RestrictedComponent';

const AntHeader = Layout.Header;

const Header = (props) => {
  const {
    pathname,
    onSearchCases,
    onSearchClients,
    onSearchLicenses,
    user,
  } = props;

  // TODO: REFACTOR
  const getHeaderTitle = (path) => {
    if (path === '/home') return 'Home';

    if (path === '/cases/all') return <Search onTextChange={text => onSearchCases(text)} placeholder="Search a case..." />;
    if (path === '/cases/add') return 'Cases';

    if (path.includes('/activities')) return 'Activity';
    if (path.includes('/cases/')) return 'View Case';

    if (path === '/vendors/edit') return 'Vendor';
    if (path === '/products/edit') return 'Product';

    if (path === '/clients') return <Search onTextChange={text => onSearchClients(text)} placeholder="Search a client..." />;
    if (path.includes('/clients')) return 'Client';

    if (path === '/licenses') return <Search onTextChange={text => onSearchLicenses(text)} placeholder="Search a license..." />;
    if (path.includes('/licenses')) return 'License';

    if (path.includes('accounts')) return 'Accounts';

    if (path.includes('reports')) return 'Reports';

    return '';
  };

  // TODO: REFACTOR
  const getHeaderButtonLink = (path) => {
    if (path === '/home') return '/cases/add';

    if (path === '/cases/all') return '/cases/add';
    if (path === '/cases/add') return '/cases/add';

    if (path.includes('/activities')) return '/cases/add';
    if (path.includes('/cases/')) return `${path}/activities/add`

    if (path === '/vendors/edit') return '/cases/add';
    if (path === '/products/edit') return '/cases/add';

    if (path.includes('/clients')) return '/cases/add';

    if (path.includes('licenses')) return '/cases/add';

    if (path.includes('accounts')) return '/cases/add';

    return '';
  };

  // TODO: REFACTOR
  const getHeaderButtonText = (path) => {
    if (path === '/home') return 'New Case';

    if (path === '/cases/all') return 'New Case';
    if (path === '/cases/add') return 'New Case';

    if (path.includes('/activities')) return 'New Case';
    if (path.includes('/cases/')) return 'New Activity';

    if (path === '/vendors/edit') return 'New Case';
    if (path === '/products/edit') return 'New Case';

    if (path.includes('/clients')) return 'New Case';

    if (path.includes('licenses')) return 'New Case';

    if (path.includes('accounts')) return 'New Case';

    return '';
  };

  return (
    <AntHeader className={styles.header}>
      <div className={styles.headerTitle}>
        <H5>{getHeaderTitle(pathname)}</H5>
      </div>
      <div>
        <div className={styles.headerButton}>
          <RestrictedComponent action="ADD_CASE">
            <Link to={getHeaderButtonLink(pathname)}>
              <Button>{getHeaderButtonText(pathname)}</Button>
            </Link>
          </RestrictedComponent>

        </div>
        <span className={styles.headerAvatar}>
          <Dropdown
            overlay={
              <Menu className={styles.menu}>
                <Menu.Item key="1">
                  <Link to={`/accounts/${user.id}/edit`}>
                    <Icon type="user" /> Edit Account
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/logout">
                    <Icon type="logout" /> Logout
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar>{user.fullName[0]}</Avatar>
          </Dropdown>
        </span>
      </div>
    </AntHeader>
  );
};

export default Header;
