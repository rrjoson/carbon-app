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
      component: () => import('./routes/AllCases'),
    }, {
      path: '/cases/add',
      component: () => import('./routes/Cases'),
    }, {
      path: '/cases/:caseId',
      component: () => import('./routes/ViewCase'),
    }, {
      path: '/cases/:caseId/edit',
      component: () => import('./routes/EditCase'),
    }, {
      path: '/cases/:caseId/activities/add',
      component: () => import('./routes/NewActivity'),
    }, {
      path: '/clients/',
      component: () => import('./routes/Clients'),
    }, {
      path: '/clients/add',
      component: () => import('./routes/AddClient'),
    }, {
      path: '/products',
      component: () => import('./routes/Products'),
    }, {
      path: '/vendors',
      component: () => import('./routes/Vendors'),
    }, {
      path: '/licenses/add',
      component: () => import('./routes/AddLicense'),
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/home" />)} />
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
