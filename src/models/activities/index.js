import { routerRedux } from 'dva/router';
import { notification } from 'antd';

import {
  addActivity,
  updateActivity,
  fetchActivity,
  fetchActivities,
} from './../../services/activities';

export default {

  namespace: 'activities',

  state: {
    data: [],
    selected: null,
    serviceReportNumber: null,
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

    *FETCH_ACTIVITY({ payload }, { call, put }) {
      const { data } = yield call(fetchActivity, payload);
      yield put({ type: 'SAVE', payload: { selected: data[0] } });
    },

    *ADD_ACTIVITY({ payload }, { call, put }) {
      yield call(addActivity, payload);
      yield put({ type: 'SAVE', payload: { serviceReportNumber: 2 } });
    },

    *UPDATE_ACTIVITY({ payload }, { call, put, select }) {
      const activityNo = yield select(state => state.activities.selected.activityNo);
      yield call(updateActivity, activityNo, payload);
      yield put(routerRedux.push(`/cases/${payload.trackingNo}`));
      notification['success']({ message: 'Activity updated.', duration: 2 });
    },

    *CLEAR_SERVICE_REPORT_NUMBER({ payload }, { call, put, select }) {
      const glocalId = yield select(state => state.cases.selected.glocalId);

      yield put({ type: 'SAVE', payload: { serviceReportNumber: null } });
      yield put(routerRedux.push(`/cases/${glocalId}`));
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
