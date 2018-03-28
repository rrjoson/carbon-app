import { fetchAccountManagers } from './../../services/accountManagers';

export default {

  namespace: 'accountManagers',

  state: {
    data: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {

      });
    },
  },

  effects: {
    *FETCH_ACCOUNT_MANAGERS({ payload }, { call, put }) {
      const { data } = yield call(fetchAccountManagers);
      yield put({ type: 'SAVE', payload: { data } });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
