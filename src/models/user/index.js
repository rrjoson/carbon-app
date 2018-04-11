import { routerRedux } from 'dva/router';
import { message, notification } from 'antd';
import config from '../../constants/config';

import {
  login,
  logout,
  addUser,
  fetchAccounts,
  fetchAccount,
  updateUser,
  updatePassword,
  updateAccount,
} from './../../services/user';

export default {

  namespace: 'user',

  state: {
    data: JSON.parse(window.localStorage.getItem(`${config.prefix}-user`)) || {},
    administrator: [],
    employees: [],
    selected: {},
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

    *ADD_USER({ payload }, { call, put }) {
      const { data } = yield call(addUser, payload);
      notification['success']({ message: 'User added.', duration: 2 });
    },

    *FETCH_ACCOUNTS({ payload }, { call, put }) {
      const { data } = yield call(fetchAccounts);

      yield put({ type: 'SAVE', payload: { employees: data.splice(1) } });
      yield put({ type: 'SAVE', payload: { administrator: [data[0]] } });
    },

    *FETCH_ACCOUNT({ payload }, { call, put, select }) {
      const { data } = yield call(fetchAccount, payload);
      yield put({ type: 'SAVE', payload: { selected: data } });
    },

    *UPDATE_ACCOUNT({ payload }, { call, put }) {
      yield call(updateAccount, payload.id, payload.isActive);

      const { data } = yield call(fetchAccounts);
      yield put({ type: 'SAVE', payload: { employees: data.splice(1) } });
      yield put({ type: 'SAVE', payload: { administrator: [data[0]] } });
    },

    *UPDATE_USER({ payload }, { call, put, select }) {
      const { id } = yield select(state => state.user.selected);
      yield call(updateUser, id, payload);
      notification['success']({ message: 'User updated.', duration: 2 });
    },

    *UPDATE_PASSWORD({ payload }, { call, put, select }) {
      const { id } = yield select(state => state.user.selected);
      yield call(updatePassword, id, payload);
      notification['success']({ message: 'Password updated.', duration: 2 });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
