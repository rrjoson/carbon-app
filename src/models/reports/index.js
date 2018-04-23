import { notification } from 'antd';
import * as services from './../../services/reports';

export default {

  namespace: 'reports',

  state: {
    totalCases: [],
    totalCasesCount: null,
    severityCount: {},
    engineerActivitiesCount: [],
    mostCasesClientCount: {},
    openCaseClientCount: {},
    resolvedCaseClientCount: {},
    caseProductCount: {},
    caseProductCountMost: {},
    vendorCaseCount: [],
    vendorLicenseCount: {},
    averageTurnaround: null,
    filters: {},
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

    *FETCH_TOTAL_CASES_COUNT({ payload }, { call, put }) {
      const { data } = yield call(services.fetchTotalCasesCount);
      yield put({ type: 'SAVE', payload: { totalCasesCount: data[0].total_cases } });
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
      const { data: mostCasesClientCount } = yield call(services.fetchMostCasesClientCount);
      yield put({ type: 'SAVE', payload: { mostCasesClientCount } });
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

    *FETCH_CASE_PRODUCT_COUNT_MOST({ payload }, { call, put }) {
      const { data: caseProductCountMost } = yield call(services.fetchCaseProductCountMost);
      yield put({ type: 'SAVE', payload: { caseProductCountMost } });
    },

    *FETCH_VENDOR_CASE_COUNT({ payload }, { call, put }) {
      const { data: vendorCaseCount } = yield call(services.fetchVendorCaseCount);
      yield put({ type: 'SAVE', payload: { vendorCaseCount } });
    },

    *FETCH_VENDOR_LICENSE_COUNT({ payload }, { call, put }) {
      const { data: vendorLicenseCount } = yield call(services.fetchVendorLicenseCount);
      yield put({ type: 'SAVE', payload: { vendorLicenseCount } });
    },

    *FETCH_AVERAGE_TURNAROUND({ payload }, { call, put }) {
      const { data } = yield call(services.fetchAverageTurnaround);
      yield put({ type: 'SAVE', payload: { averageTurnaround: data[0].avg } });
    },

    *FETCH_REPORTS_BY_FILTER({ payload }, { call, put, select }) {
      console.warn(payload)
      const currentFilters = yield select(state => state.cases.filters);
      const updatedFilters = { ...currentFilters, [payload.key]: [...(currentFilters[payload.key] ? currentFilters[payload.key] : []), payload.value] };
      yield put({ type: 'SAVE', payload: { filters: updatedFilters } });
      // const { data } = yield call(services.fetchAverageTurnaround);
      // yield put({ type: 'SAVE', payload: { averageTurnaround: data[0].avg } });
    },

    *FETCH_REPORTS({ payload }, { call, put, select }) {
      yield put({ type: 'SAVE', payload: { filters: {} } });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
