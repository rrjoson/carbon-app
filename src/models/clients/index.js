import { routerRedux } from 'dva/router';
import { notification } from 'antd';

import {
  fetchClients,
  fetchClient,
  addClient,
  updateClient,
} from './../../services/clients';

export default {

  namespace: 'clients',

  state: {
    data: [],
    selected: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/cases/add') {
          dispatch({ type: 'FETCH_CLIENTS' });
        }
      });
    },
  },

  effects: {
    *FETCH_CLIENTS({ payload }, { call, put }) {
      const { data } = yield call(fetchClients);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *FETCH_CLIENT({ payload }, { call, put }) {
      const { data } = yield call(fetchClient, payload);
      yield put({ type: 'SAVE', payload: { selected: data[0] } });
    },

    *ADD_CLIENT({ payload }, { call, put }) {
      const { data } = yield call(addClient, payload);
      notification['success']({ message: 'Client added.', duration: 2 });
      yield put(routerRedux.push('/clients'));
    },

    *UPDATE_CLIENT({ payload }, { call, put, select }) {
      const accountName = yield select(state => state.clients.selected.accountName);
      const { data } = yield call(updateClient, accountName, payload);
      notification['success']({ message: 'Client updated.', duration: 2 });
      yield put(routerRedux.push('/clients'));
    },
  },

  reducers: {
    SAVE(state, action) {

      return { ...state, ...action.payload };
    },
  },

};
