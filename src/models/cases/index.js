import { routerRedux } from 'dva/router';
import { notification } from 'antd';

import {
  fetchAllCases,
  fetchCase,
  createCase,
  updateCase,
  fetchNextId,
  updateCaseStatus,
} from './../../services/cases';


export default {

  namespace: 'cases',

  state: {
    data: [],
    nextId: null,
    selected: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/home') {
          dispatch({ type: 'FETCH_ALL_CASES' });
        }
      });
    },
  },

  effects: {
    *FETCH_CASE({ payload }, { call, put }) {
      const { data } = yield call(fetchCase, payload);
      yield put({ type: 'SAVE', payload: { selected: data[0] } });
    },

    *FETCH_NEXT_ID({ payload }, { call, put }) {
      const { data } = yield call(fetchNextId, payload);
      yield put({ type: 'SAVE', payload: { nextId: data[0]['next_id'] } });
    },

    *FETCH_ALL_CASES({ payload }, { call, put }) {
      const { data } = yield call(fetchAllCases);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *CREATE_CASE({ payload }, { call, put }) {
      const data = yield call(createCase, payload);
      yield put(routerRedux.push('/cases/all'));
      notification['success']({ message: 'Case created.', duration: 2 });
    },

    *UPDATE_CASE({ payload }, { call, put, select }) {
      const selectedCase = yield select(state => state.cases.selected);
      const data = yield call(updateCase, payload);
      yield put(routerRedux.push(`/cases/${selectedCase.glocalId}`));
      notification['success']({ message: 'Case updated.', duration: 2 });
    },

    *UPDATE_STATUS({ payload }, { call, put, select }) {
      const selectedCase = yield select(state => state.cases.selected);
      const data = yield call(updateCaseStatus, payload, selectedCase);
      notification['success']({ message: 'Status updated.', duration: 2 });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
