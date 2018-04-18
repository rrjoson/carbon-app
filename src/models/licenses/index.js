import { routerRedux } from 'dva/router';
import { Modal, notification } from 'antd';
import { restrictions } from './../../utils/restrictions';

import {
  addLicense,
  fetchActiveLicenses,
  fetchExpiredLicenses,
  fetchActiveLicensesByQuery,
  fetchExpiredLicensesByQuery,
  fetchLicense,
  updateLicense,
  deleteLicense,
} from './../../services/licenses';

export default {

  namespace: 'licenses',

  state: {
    data: [],
    active: [],
    expired: [],
    selected: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {

      });
    },
  },

  effects: {
    *FETCH_ACTIVE_LICENSES({ payload }, { call, put }) {
      const { data: active } = yield call(fetchActiveLicenses);
      yield put({ type: 'SAVE', payload: { active } });
    },

    *FETCH_EXPIRED_LICENSES({ payload }, { call, put }) {
      const { data: expired } = yield call(fetchExpiredLicenses);
      yield put({ type: 'SAVE', payload: { expired } });
    },

    FETCH_ACTIVE_AND_EXPIRED_LICENSES_BY_QUERY: [function* ({ payload }, { call, put }) {
      const { data: active } = yield call(fetchActiveLicensesByQuery, payload);
      const { data: expired } = yield call(fetchExpiredLicensesByQuery, payload);
      yield put({ type: 'SAVE', payload: { active, expired } });
    }, { type: 'throttle', ms: 500 }],

    *FETCH_LICENSE({ payload }, { call, put }) {
      const { data } = yield call(fetchLicense, payload);
      yield put({ type: 'SAVE', payload: { selected: data } });
    },

    *ADD_LICENSE({ payload }, { call, put, select }) {
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

    *DELETE_LICENSE({ payload }, { call, put, select }) {
      const { data } = yield call(deleteLicense, payload);
      notification['success']({ message: 'License deleted.', duration: 2 });
      yield put(routerRedux.push('/licenses'));
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
