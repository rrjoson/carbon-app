import {
  fetchClients,
  fetchClient,
  addClient
} from './../../services/clients';

export default {

  namespace: 'clients',

  state: {
    data: [],
    selected: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/cases/add') {
          dispatch({ type: 'FETCH_CLIENTS' });
        }
      });
    },
  },

  effects: {
    *FETCH_CLIENTS({ payload }, { call, put, select }) {
      const { data } = yield call(fetchClients);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *FETCH_CLIENT({ payload }, { call, put, select }) {
      const { data } = yield call(fetchClient, payload);
      yield put({ type: 'SAVE', payload: { selected: data[0] } });
    },

    *ADD_CLIENT({ payload }, { call, put }) {
      const { data } = yield call(addClient, payload);
    },
  },


  reducers: {
    SAVE(state, action) {
      console.warn(state, action.payload)
      return { ...state, ...action.payload };
    },
  },

};
