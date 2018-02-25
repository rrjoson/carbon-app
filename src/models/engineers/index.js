import { fetchEngineers } from './../../services/engineers';

export default {

  namespace: 'engineers',

  state: {
    data: [],
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
  },


  reducers: {
    SAVE(state, action) {
      console.warn(state, action.payload)
      return { ...state, ...action.payload };
    },
  },

};
