import { routerRedux } from 'dva/router';
import { Modal, notification } from 'antd';
import { restrictions } from './../../utils/restrictions';

import {
  addLicense,
  fetchLicenses,
  fetchLicensesByQuery,
  fetchLicense,
  updateLicense,
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

    FETCH_LICENSES_BY_QUERY: [function* ({ payload }, { call, put }) {
      const { data } = yield call(fetchLicensesByQuery, payload);
      yield put({ type: 'SAVE', payload: { data } });
    }, { type: 'throttle', ms: 500 }],

    *FETCH_LICENSE({ payload }, { call, put }) {
      const { data } = yield call(fetchLicense, payload);
      yield put({ type: 'SAVE', payload: { selected: data } });
    },

    *ADD_LICENSE({ payload }, { call, put }) {
      const { position } = yield select(state => state.user.data);
      if (restrictions[position].includes('ADD_LICENSE')) return Modal.error({ title: 'Error', content: 'You don\'t have permission to do this action.' });

      const { data } = yield call(addLicense, payload);
      yield put(routerRedux.push('/licenses'));
      notification['success']({ message: 'License added.', duration: 2 });
    },

    *UPDATE_LICENSE({ payload }, { call, put, select }) {
      const { position } = yield select(state => state.user.data);
      if (restrictions[position].includes('UPDATE_LICENSE')) return Modal.error({ title: 'Error', content: 'You don\'t have permission to do this action.' });

      const licenseId = yield select(state => state.licenses.selected.licenseId);
      const { data } = yield call(updateLicense, licenseId, payload);
      yield put(routerRedux.push('/licenses'));
      notification['success']({ message: 'License updated.', duration: 2 });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
