import { notification } from 'antd';

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
      notification['success']({ message: 'License added.', duration: 2 });
    },
  },


  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
