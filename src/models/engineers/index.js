import {
  fetchEngineers,
  fetchEngineer,
} from './../../services/engineers';

export default {

  namespace: 'engineers',

  state: {
    data: [],
    selected: null,
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
