import { notification } from 'antd';
import * as services from './../../services/reports';

export default {

  namespace: 'reports',

  state: {
    totalCases: null,
    severityCount: null,
    engineerActivitiesCount: null,
    mostCaseClientCount: null,
    openCaseClientCount: null,
    resolvedCaseClientCount: null,
    caseProductCount: null,
    vendorCaseCount: null,
    vendorLicenseCount: null,
    turnaround: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {

      });
    },
  },

  effects: {
    *FETCH_TOTAL_CASES({ payload }, { call, put }) {
      const { data: totalCases } = yield call(services.fetchTotalCases);
      yield put({ type: 'SAVE', payload: { totalCases } });
    },

    *FETCH_SEVERITY_COUNT({ payload }, { call, put }) {
      const { data: severityCount } = yield call(services.fetchSeverityCount);
      yield put({ type: 'SAVE', payload: { severityCount } });
    },

    *FETCH_ENGINEER_ACTIVITIES_COUNT({ payload }, { call, put }) {
      const { data: engineerActivitiesCount } = yield call(services.fetchEngineerAcitivitesCount);
      yield put({ type: 'SAVE', payload: { engineerActivitiesCount } });
    },

    *FETCH_MOST_CASE_CLIENT_COUNT({ payload }, { call, put }) {
      const { data: mostCaseClientCount } = yield call(services.fetchMostCaseClientCount);
      yield put({ type: 'SAVE', payload: { mostCaseClientCount } });
    },

    *FETCH_OPEN_CASE_CLIENT_COUNT({ payload }, { call, put }) {
      const { data: openCaseClientCount } = yield call(services.fetchOpenCaseClientCount);
      yield put({ type: 'SAVE', payload: { openCaseClientCount } });
    },

    *FETCH_RESOLVED_CASE_CLIENT_COUNT({ payload }, { call, put }) {
      const { data: resolvedCaseClientCount } = yield call(services.fetchResolvedCaseClientCount);
      yield put({ type: 'SAVE', payload: { resolvedCaseClientCount } });
    },

    *FETCH_CASE_PRODUCT_COUNT({ payload }, { call, put }) {
      const { data: caseProductCount } = yield call(services.fetchCaseProductCount);
      yield put({ type: 'SAVE', payload: { caseProductCount } });
    },

    *FETCH_VENDOR_CASE_COUNT({ payload }, { call, put }) {
      const { data: vendorCaseCount } = yield call(services.fetchVendorCaseCount);
      yield put({ type: 'SAVE', payload: { vendorCaseCount } });
    },

    *FETCH_VENDOR_LICENSE_COUNT({ payload }, { call, put }) {
      const { data: vendorLicenseCount } = yield call(services.fetchVendorLicenseCount);
      yield put({ type: 'SAVE', payload: { vendorLicenseCount } });
    },

    *FETCH_TURNAROUND({ payload }, { call, put }) {
      const { data: turnaround } = yield call(services.fetchTurnaround);
      yield put({ type: 'SAVE', payload: { turnaround } });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};