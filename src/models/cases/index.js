import {
  fetchAllCases,
  fetchCase,
  createCase,
  updateCase,
  fetchNextId,
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

        if (pathname === '/cases/all') {
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
      yield put({ type: 'SAVE', payload: { nextId: data[0]['?column?'] } });

    },

    *FETCH_ALL_CASES({ payload }, { call, put }) {
      const { data } = yield call(fetchAllCases);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *CREATE_CASE({ payload }, { call, put }) {
      const data = yield call(createCase, payload);
    },

    *UPDATE_CASE({ payload }, { call, put }) {
      const data = yield call(updateCase, payload);
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
