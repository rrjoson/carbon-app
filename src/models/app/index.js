import queryString from 'query-string';
import { routerRedux } from 'dva/router';

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

    setup({ dispatch, history }) {
      dispatch({ type: 'INITIALIZE' });
      dispatch({ type: 'user/CHECK_IF_USER_IS_LOGGED_IN' });
    },
  },

  effects: {
    *INITIALIZE({ payload }, { call, put }) {
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
