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
      const accountManagers = [];
      data.forEach((item) => {
        if (!accountManagers.includes(item.accountManager)) {
          accountManagers.push(item.accountManager);
        }
      });
      yield put({ type: 'SAVE', payload: { data: accountManagers } });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
