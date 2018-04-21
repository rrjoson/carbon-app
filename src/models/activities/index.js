import { routerRedux } from 'dva/router';
import { Modal, notification } from 'antd';
import { restrictions } from './../../utils/restrictions';

import {
  addActivity,
  updateActivity,
  deleteActivity,
  fetchActivity,
  fetchActivities,
  fetchActivitiesByEngineerName,
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

    *FETCH_ACTIVITIES_BY_ENGINEER_NAME({ payload }, { call, put }) {
      const { data } = yield call(fetchActivitiesByEngineerName, payload);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *FETCH_ACTIVITY({ payload }, { call, put }) {
      const { data } = yield call(fetchActivity, payload);
      yield put({ type: 'SAVE', payload: { selected: data[0] } });
    },

    *ADD_ACTIVITY({ payload }, { call, put, select }) {
      const { position } = yield select(state => state.user.data);
      const glocalId = yield select(state => state.cases.selected.glocalId);

      if (restrictions[position] && restrictions[position].includes('ADD_ACTIVITY')) return Modal.error({ title: 'Error', content: 'You don\'t have permission to do this action.' });

      const { data } = yield call(addActivity, payload);

      if (payload.typeOfActivity !== 'Remote') {
        const { data: activity } = yield call(fetchActivity, data.report[0].activityNo);
        yield put({ type: 'SAVE', payload: { serviceReportNumber: activity[0].sr_number } });
      } else {
        yield put(routerRedux.push(`/cases/${glocalId}`));
        notification.success({ message: 'Activity added.', duration: 2 });
      }
    },

    *UPDATE_ACTIVITY({ payload }, { call, put, select }) {
      const { position } = yield select(state => state.user.data);
      if (restrictions[position] && restrictions[position].includes('UPDATE_ACTIVITY')) return Modal.error({ title: 'Error', content: 'You don\'t have permission to do this action.' });

      const glocalId = yield select(state => state.cases.selected.glocalId);
      const activityNo = yield select(state => state.activities.selected.activityNo);

      yield call(updateActivity, activityNo, payload);
      yield put(routerRedux.push(`/cases/${glocalId}`));

      notification.success({ message: 'Activity updated.', duration: 2 });
    },

    *DELETE_ACTIVITY({ payload }, { call, put, select }) {
      const { position } = yield select(state => state.user.data);
      if (restrictions[position] && restrictions[position].includes('DELETE_ACTIVITY')) return Modal.error({ title: 'Error', content: 'You don\'t have permission to do this action.' });

      const activities = yield select(state => state.activities.data);
      const data = activities.filter(item => item.activityNo !== payload);

      yield call(deleteActivity, payload);
      yield put({ type: 'SAVE', payload: { data } });

      notification.success({ message: 'Activity deleted.', duration: 2 });
    },

    *CLEAR_SERVICE_REPORT_NUMBER({ payload }, { put, select }) {
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
