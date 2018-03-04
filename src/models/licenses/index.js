import {
  addLicense
} from './../../services/licenses';

export default {

  namespace: 'licenses',

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
    *ADD_LICENSE({ payload }, { call, put, select, all }) {
      const { data } = yield call(addLicense, payload);
      console.warn(data)
    },
  },


  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
