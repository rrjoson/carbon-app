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
      path: '/dashboard',
      component: () => import('./routes/Dashboard'),
    }, {
      path: '/cases',
      component: () => import('./routes/Cases'),
    }, {
      path: '/clients',
      component: () => import('./routes/Clients'),
    }, {
      path: '/products',
      component: () => import('./routes/Products'),
    }, {
      path: '/vendors',
      component: () => import('./routes/Vendors'),
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
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
