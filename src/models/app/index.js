import queryString from 'query-string';

export default {

  namespace: 'app',

  state: {
    locationPathname: '',
    locationQuery: {},
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        });
      });
    },
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
