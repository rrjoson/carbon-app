import { routerRedux } from 'dva/router';
import { notification, Modal } from 'antd';
import { serialize } from './../../utils/query';
import { restrictions } from './../../utils/restrictions';

import {
  fetchAllCases,
  fetchCasesByQuery,
  fetchCasesByFilter,
  fetchCasesBySeverity,
  fetchCasesOfLoggedInUser,
  fetchCasesOfLoggedInUserByFilter,
  fetchCase,
  createCase,
  updateCase,
  fetchNextId,
  updateCaseStatus,
  deleteCase,
} from './../../services/cases';


export default {

  namespace: 'cases',

  state: {
    data: [],
    list: [[], [], [], []],
    filters: {},
    nextId: null,
    selected: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/home') {
          // TODO: REFACTOR
          dispatch({ type: 'RESET_FILTERS_OF_CASES_OF_LOGGED_IN_USER' });
        }

        if (pathname === '/cases/all') {
          // TODO: REFACTOR
          dispatch({ type: 'RESET_FILTERS' });
        }
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

      console.warn(payload)
      const currentFilters = yield select(state => state.cases.filters);
      const updatedFilters = { ...currentFilters, [payload.key]: [...(currentFilters[payload.key] ? currentFilters[payload.key] : []), payload.value] };
      yield put({ type: 'SAVE', payload: { filters: updatedFilters } });

      const { data } = yield call(fetchCasesByFilter, serialize(updatedFilters));
      yield put({ type: 'SAVE', payload: { data } });
    },

    *FETCH_CASES_OF_LOGGED_IN_USER_BY_FITLER({ payload }, { call, put, select }) {
      const currentFilters = yield select(state => state.cases.filters);
      const updatedFilters = { ...currentFilters, [payload.key]: [...(currentFilters[payload.key] ? currentFilters[payload.key] : []), payload.value] };
      yield put({ type: 'SAVE', payload: { filters: updatedFilters } });

      const user = yield select(state => state.user.data);
      const { data } = yield call(fetchCasesOfLoggedInUserByFilter, user.fullName, serialize(updatedFilters));
      yield put({ type: 'SAVE', payload: { data } });
    },

    *FETCH_CASES_BY_SEVERITY({ payload }, { call, put, select }) {
      const list = yield select(state => state.cases.list);
      const { data } = yield call(fetchCasesBySeverity, payload);

      list[payload - 1] = data;
      yield put({ type: 'SAVE', payload: { list } });
    },

    *FETCH_CASES_OF_LOGGED_IN_USER({ payload }, { call, put, select }) {
      const user = yield select(state => state.user.data);

      const { data } = yield call(fetchCasesOfLoggedInUser, user.fullName);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *RESET_FILTERS({ payload }, { call, put }) {
      yield put({ type: 'SAVE', payload: { filters: {} } });

      const { data } = yield call(fetchAllCases);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *RESET_FILTERS_OF_CASES_OF_LOGGED_IN_USER({ payload }, { call, put, select }) {
      const user = yield select(state => state.user.data);
      yield put({ type: 'SAVE', payload: { filters: {} } });

      const { data } = yield call(fetchCasesOfLoggedInUser, user.fullName);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *REMOVE_FILTER({ payload }, { call, put, select }) {
      const currentFilters = yield select(state => state.cases.filters);
      const updatedFilters = { ...currentFilters, [payload.key]: currentFilters[payload.key].filter(item => item !== payload.value) };

      yield put({ type: 'SAVE', payload: { filters: updatedFilters } });

      const { data } = yield call(fetchCasesByFilter, serialize(updatedFilters));
      yield put({ type: 'SAVE', payload: { data } });
    },

    *REMOVE_FILTER_OF_CASES_OF_LOGGED_IN_USER({ payload }, { call, put, select }) {
      const currentFilters = yield select(state => state.cases.filters);
      const updatedFilters = { ...currentFilters, [payload.key]: currentFilters[payload.key].filter(item => item !== payload.value) };

      yield put({ type: 'SAVE', payload: { filters: updatedFilters } });

      const user = yield select(state => state.user.data);
      const { data } = yield call(fetchCasesOfLoggedInUserByFilter, user.fullName, serialize(updatedFilters));
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

    *CREATE_CASE({ payload }, { call, put, select }) {
      const { position } = yield select(state => state.user.data);
      if (restrictions[position].includes('ADD_CASE')) return Modal.error({ title: 'Error', content: 'You don\'t have permission to do this action.' });

      yield call(createCase, payload);
      yield put(routerRedux.push('/cases/all'));
      notification['success']({ message: 'Case created.', duration: 2 });
    },

    *UPDATE_CASE({ payload }, { call, put, select }) {
      const { position } = yield select(state => state.user.data);
      if (restrictions[position].includes('EDIT_CASE')) return Modal.error({ title: 'Error', content: 'You don\'t have permission to do this action.' });

      const selectedCase = yield select(state => state.cases.selected);
      yield call(updateCase, payload);
      yield put(routerRedux.push(`/cases/${selectedCase.glocalId}`));
      notification['success']({ message: 'Case updated.', duration: 2 });
    },

    *UPDATE_STATUS({ payload }, { call, put, select }) {
      const selectedCase = yield select(state => state.cases.selected);
      const data = yield call(updateCaseStatus, payload, selectedCase);
      notification['success']({ message: 'Status updated.', duration: 2 });
    },

    *DELETE_CASE({ payload }, { call, put, select }) {
      const { data } = yield call(deleteCase, payload);
      notification['success']({ message: 'Case deleted.', duration: 2 });
      yield put(routerRedux.push('/cases/all'));
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
