import {
  fetchEngineers,
  fetchEngineer,
  fetchSeLeads
} from './../../services/engineers';

export default {

  namespace: 'engineers',

  state: {
    data: [],
    selected: null,
    leads: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/cases/add') {
          dispatch({ type: 'FETCH_ENGINEERS' });
        }
        if (pathname === '/clients/add') {
          dispatch({ type: 'FETCH_ENGINEERS' });
        }
      });
    },
  },

  effects: {
    *FETCH_SE_LEADS({ payload }, { call, put }) {
      const { data: leads } = yield call(fetchSeLeads);
      yield put({ type: 'SAVE', payload: { leads } });
    },

    *FETCH_ENGINEERS({ payload }, { call, put }) {
      const { data } = yield call(fetchEngineers);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *FETCH_ENGINEER({ payload }, { call, put }) {
      const { data } = yield call(fetchEngineer, payload);
      yield put({ type: 'SAVE', payload: { selected: data } });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
