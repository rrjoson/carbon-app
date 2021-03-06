import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';

const { ConnectedRouter } = routerRedux;

const Routers = ({ history, app }) => {
  const error = dynamic({
    app,
    component: () => import('./routes/Error'),
  });

  const routes = [
    {
      path: '/home',
      component: () => import('./routes/Home'),
    }, {
      path: '/cases/all',
      component: () => import('./routes/ViewCases'),
    }, {
      path: '/cases/add',
      component: () => import('./routes/AddCase'),
    }, {
      path: '/cases/:caseId',
      component: () => import('./routes/ViewCase'),
    }, {
      path: '/cases/:caseId/edit',
      component: () => import('./routes/EditCase'),
    }, {
      path: '/cases/:caseId/activities/add',
      component: () => import('./routes/AddActivity'),
    }, {
      path: '/cases/:caseId/activities/:activityNo/edit',
      component: () => import('./routes/EditActivity'),
    }, {
      path: '/clients',
      component: () => import('./routes/ViewClients'),
    }, {
      path: '/clients/add',
      component: () => import('./routes/AddClient'),
    }, {
      path: '/clients/:accountName',
      component: () => import('./routes/ViewClient'),
    }, {
      path: '/clients/:accountName/edit',
      component: () => import('./routes/EditClient'),
    }, {
      path: '/products/edit',
      component: () => import('./routes/EditProducts'),
    }, {
      path: '/vendors/edit',
      component: () => import('./routes/EditVendors'),
    }, {
      path: '/licenses',
      component: () => import('./routes/ViewLicenses'),
    }, {
      path: '/licenses/add',
      component: () => import('./routes/AddLicense'),
    }, {
      path: '/licenses/:licenseId',
      component: () => import('./routes/ViewLicense'),
    }, {
      path: '/licenses/:licenseId/edit',
      component: () => import('./routes/EditLicense'),
    }, {
      path: '/activities/:engineerName',
      component: () => import('./routes/ViewActivities'),
    }, {
      path: '/reports',
      component: () => import('./routes/ViewReports'),
    }, {
      path: '/accounts',
      component: () => import('./routes/ViewAccounts'),
    }, {
      path: '/accounts/add',
      component: () => import('./routes/AddAccount'),
    }, {
      path: '/accounts/:id/edit',
      component: () => import('./routes/EditAccount'),
    }, {
      path: '/se-list',
      component: () => import('./routes/ViewSE'),
    }, {
      path: '/login',
      component: () => import('./routes/Login'),
    }, {
      path: '/logout',
      component: () => import('./routes/Logout'),
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route
                key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
