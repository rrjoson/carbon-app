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

    *ADD_ACTIVITY({ payload }, { call, put }) {
      yield call(addActivity, payload);
      yield put({ type: 'SAVE', payload: { serviceReportNumber: 2 } });

      // notification['success']({ message: 'Activity created.', duration: 2 });
    },

    *CLEAR_SERVICE_REPORT_NUMBER({ payload }, { call, put, select }) {
      const glocalId = yield select(state => state.cases.selected.glocalid);

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
