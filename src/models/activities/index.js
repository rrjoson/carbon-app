import {
  addActivity,
} from './../../services/activities';

export default {

  namespace: 'activities',

  state: {
    data: [],
    selected: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {

      });
    },
  },

  effects: {
    *ADD_ACTIVITY({ payload }, { call, put }) {
      yield call(addActivity, payload);
      // yield put({ type: 'SAVE', payload: { selected: data[0] } });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
