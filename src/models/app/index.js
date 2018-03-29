import queryString from 'query-string';

export default {

  namespace: 'app',

  state: {
    initialized: false,
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
      dispatch({ type: 'INITIALIZE' });
    },
  },

  effects: {
    *INITIALIZE({ payload }, { call, put }) {  // eslint-disable-line
      yield call((timeout) => {
        return new Promise((resolve) => {
          setTimeout(resolve, timeout);
        });
      }, 2000);
      yield put({ type: 'save', payload: { initialized: true } });
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
