import { message } from 'antd';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import 'babel-polyfill';

import './index.css';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError(error) {
    message.error(error.message);
  },
});

// 2. Model
app.model(require('./models/app'));
app.model(require('./models/cases'));
app.model(require('./models/vendors'));
app.model(require('./models/products'));
app.model(require('./models/clients'));
app.model(require('./models/customers'));
app.model(require('./models/engineers'));
app.model(require('./models/activities'));
app.model(require('./models/licenses'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
