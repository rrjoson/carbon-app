import { routerRedux } from 'dva/router';
import { message } from 'antd';
import config from '../../constants/config';

import {
  login,
  logout,
} from './../../services/user';

export default {

  namespace: 'user',

  state: {
    data: JSON.parse(window.localStorage.getItem(`${config.prefix}-user`)) || {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {

      });
    },
  },

  effects: {
    *LOGIN({ payload }, { call, put }) {
      const { data } = yield call(login, payload);

      const isUserLoggedIn = data.id !== undefined;

      if (!isUserLoggedIn) return message.error('Invalid login');

      // TODO: USE REDUX PERSIST
      window.localStorage.setItem(`${config.prefix}-user`, JSON.stringify(data));

      yield put({ type: 'SAVE', payload: { data } });
      yield put(routerRedux.push('/home'));
    },

    *LOGOUT({ payload }, { call, put }) {
      const response = yield call(logout);

      if (response.status !== 200) return;

      // TODO: USE REDUX PERSIST
      window.localStorage.removeItem(`${config.prefix}-user`);

      yield put({ type: 'SAVE', payload: { data: {} } });
      yield put(routerRedux.push('/login'));
    },

    *CHECK_IF_USER_IS_LOGGED_IN({ payload }, { put, select }) {
      const { data } = yield select(state => state.user);
      const isUserLoggedIn = data.id !== undefined;

      const { locationPathname } = yield select(state => state.app);

      if (!isUserLoggedIn) {
        yield put(routerRedux.push('/login'));
      } else if (locationPathname === '/login') {
        yield put(routerRedux.push('/home'));
      }
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
