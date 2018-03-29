import { routerRedux } from 'dva/router';

import {
  login,
} from './../../services/auth';

export default {

  namespace: 'auth',

  state: {
    data: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {

      });
    },
  },

  effects: {
    *LOGIN({ payload }, { call, put }) {
      const data = yield call(login, payload);
      console.warn(data)
      yield put({ type: 'SAVE', payload: { data } });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
