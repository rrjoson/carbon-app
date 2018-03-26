import { routerRedux } from 'dva/router';
import { notification } from 'antd';

import {
  addLicense,
  fetchLicenses,
  fetchLicense,
} from './../../services/licenses';

export default {

  namespace: 'licenses',

  state: {
    data: [],
    selected: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {

      });
    },
  },

  effects: {
    *FETCH_LICENSES({ payload }, { call, put }) {
      const { data } = yield call(fetchLicenses);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *FETCH_LICENSE({ payload }, { call, put }) {
      const { data } = yield call(fetchLicense, payload);
      yield put({ type: 'SAVE', payload: { selected: data } });
    },

    *ADD_LICENSE({ payload }, { call, put, select, all }) {
      const { data } = yield call(addLicense, payload);
      yield put(routerRedux.push('/licenses'));
      notification['success']({ message: 'License added.', duration: 2 });
    },
  },


  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
