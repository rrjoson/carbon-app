import { routerRedux } from 'dva/router';
import { notification } from 'antd';

import {
  addActivity,
  fetchActivities,
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
    *FETCH_ACTIVITIES({ payload }, { call, put }) {
      const { data } = yield call(fetchActivities, payload);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *ADD_ACTIVITY({ payload }, { call, put }) {
      yield call(addActivity, payload);
      yield put(routerRedux.push(`/cases/${payload.trackingNo}`));
      notification['success']({ message: 'Activity created.', duration: 2 });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
