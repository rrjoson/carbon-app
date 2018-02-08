import { fetchAllCases } from './../../services/cases';

export default {

  namespace: 'cases',

  state: {
    data: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/cases/all') {
          dispatch({ type: 'FETCH_ALL_CASES' });
        }
      });
    },
  },

  effects: {
    *FETCH_ALL_CASES({ payload }, { call, put }) {
      const { data } = yield call(fetchAllCases);
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
