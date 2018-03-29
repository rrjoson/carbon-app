import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { serialize } from './../../utils/query';

import {
  fetchAllCases,
  fetchCasesByQuery,
  fetchCasesByFilter,
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
    filters: {},
    nextId: null,
    selected: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        dispatch({ type: 'RESET_FILTERS' });
      });
    },
  },

  effects: {
    *FETCH_CASE({ payload }, { call, put }) {
      const { data } = yield call(fetchCase, payload);
      yield put({ type: 'SAVE', payload: { selected: data[0] } });
    },

    FETCH_CASES_BY_QUERY: [function* ({ payload }, { call, put }) {
      const { data } = yield call(fetchCasesByQuery, payload);
      yield put({ type: 'SAVE', payload: { data } });
    }, { type: 'throttle', ms: 500 }],

    *FETCH_CASES_BY_FITLER({ payload }, { call, put, select }) {
      const currentFilters = yield select(state => state.cases.filters);

      const updatedFilters = { ...currentFilters, [payload.key]: payload.value };
      yield put({ type: 'SAVE', payload: { filters: updatedFilters } });

      const { data } = yield call(fetchCasesByFilter, serialize(updatedFilters));
      yield put({ type: 'SAVE', payload: { data } });
    },

    *RESET_FILTERS({ payload }, { call, put }) {
      yield put({ type: 'SAVE', payload: { filters: {} } });

      const { data } = yield call(fetchAllCases);
      yield put({ type: 'SAVE', payload: { data } });
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
