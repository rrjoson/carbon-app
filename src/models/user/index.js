import { routerRedux } from 'dva/router';
import { message, notification } from 'antd';
import config from '../../constants/config';

import {
  login,
  logout,
  addUser,
  deleteUser,
  fetchAccounts,
  fetchAccount,
  fetchRegularAccounts,
  fetchAdminAccounts,
  updateUser,
  updateOtherUser,
  updateOwnPassword,
  updateAccountPassword,
  updateStatus,
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
      const { data: employees } = yield call(fetchRegularAccounts);
      const { data: administrator } = yield call(fetchAdminAccounts);

      yield put({ type: 'SAVE', payload: { employees } });
      yield put({ type: 'SAVE', payload: { administrator } });
    },

    *FETCH_ACCOUNT({ payload }, { call, put, select }) {
      const { data } = yield call(fetchAccount, payload);
      yield put({ type: 'SAVE', payload: { selected: data } });
    },

    *UPDATE_STATUS({ payload }, { call, put }) {
      yield call(updateStatus, payload.id, payload.isActive);

      const { data: employees } = yield call(fetchRegularAccounts);
      const { data: administrator } = yield call(fetchAdminAccounts);

      yield put({ type: 'SAVE', payload: { employees } });
      yield put({ type: 'SAVE', payload: { administrator } });
    },

    *UPDATE_USER({ payload }, { call, put, select }) {
      const { userid } = yield select(state => state.user.selected);
      const { position } = yield select(state => state.user.data);

      if (position === 'Managing Director') {
        yield call(updateOtherUser, userid, payload);
      } else {
        yield call(updateUser, userid, payload);
      }

      notification['success']({ message: 'User updated.', duration: 2 });
    },

    *DELETE_USER({ payload }, { call, put, select }) {
      yield call(deleteUser, payload);
      yield put(routerRedux.push('/accounts'));
      notification['success']({ message: 'User deleted.', duration: 2 });
    },

    *UPDATE_PASSWORD({ payload }, { call, put, select }) {
      const { userid } = yield select(state => state.user.selected);
      const { position } = yield select(state => state.user.data);

      if (position === 'Managing Director') {
        yield call(updateAccountPassword, userid, payload);
      } else {
        yield call(updateOwnPassword, userid, payload);
      }

      notification['success']({ message: 'Password updated.', duration: 2 });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
