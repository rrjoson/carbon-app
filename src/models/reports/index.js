import { notification } from 'antd';
import { serialize } from './../../utils/query';
import * as services from './../../services/reports';
import moment from 'moment';

export default {

  namespace: 'reports',

  state: {
    clientWithMostCases: '',
    productWithMostCases: '',
    averageTurnaroundTime: 0,
    openCaseClientCount: 0,


    totalCases: [],
    totalCasesCount: 0,
    engineerActivitiesCount: [],
    resolvedCaseClientCount: 0,
    severityCount: [],
    caseProductCount: [],
    vendorCaseCount: [],
    filters: {
      timePeriod: [[moment().subtract(12, 'month').add(1, 'day').format('MM/DD/YYYY'), moment().format('MM/DD/YYYY')]]
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/reports') {
          dispatch({ type: 'RESET_FILTERS' });
        }
      });
    },
  },

  effects: {
    *FETCH_REPORTS({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      yield put({ type: 'SAVE', payload: { filters: {...filters, customer: [] } } });

      yield put({ type: 'FETCH_CLIENT_WITH_MOST_CASES' });
      yield put({ type: 'FETCH_PRODUCT_WITH_MOST_CASES' });
      yield put({ type: 'FETCH_AVERAGE_TURNAROUND_TIME' });
      yield put({ type: 'FETCH_TOTAL_CASES' });
      yield put({ type: 'FETCH_VENDOR_CASE_COUNT' });
      yield put({ type: 'FETCH_ENGINEER_ACTIVITIES_COUNT' });
      yield put({ type: 'FETCH_SEVERITY_COUNT' });
    },

    *RESET_FILTERS({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      yield put({ type: 'SAVE', payload: { filters: { customer: [], timePeriod: [[moment().subtract(12, 'month').add(1, 'day').format('MM/DD/YYYY'), moment().format('MM/DD/YYYY')]] } } });

      yield put({ type: 'FETCH_CLIENT_WITH_MOST_CASES' });
      yield put({ type: 'FETCH_PRODUCT_WITH_MOST_CASES' });
      yield put({ type: 'FETCH_AVERAGE_TURNAROUND_TIME' });
      yield put({ type: 'FETCH_TOTAL_CASES' });
      yield put({ type: 'FETCH_VENDOR_CASE_COUNT' });
      yield put({ type: 'FETCH_ENGINEER_ACTIVITIES_COUNT' });
      yield put({ type: 'FETCH_SEVERITY_COUNT' });
    },

    *FETCH_CLIENT_WITH_MOST_CASES({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data } = yield call(services.fetchClientWithMostCases, serialize(filters));
      yield put({ type: 'SAVE', payload: { clientWithMostCases: data.customer } });
    },

    *FETCH_PRODUCT_WITH_MOST_CASES({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data } = yield call(services.fetchProductWithMostCases, serialize(filters));
      yield put({ type: 'SAVE', payload: { productWithMostCases: data.productName } });
    },

    *FETCH_AVERAGE_TURNAROUND_TIME({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data } = yield call(services.fetchAverageTurnaround, serialize(filters));
      yield put({ type: 'SAVE', payload: { averageTurnaroundTime: data[0] ? data[0].avg : 0 } });
    },

    *FETCH_TOTAL_CASES({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data: totalCases } = yield call(services.fetchTotalCases, serialize(filters));
      yield put({ type: 'SAVE', payload: { totalCases } });
    },

    *FETCH_TOTAL_CASES_COUNT({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data } = yield call(services.fetchTotalCasesCount, serialize(filters));
      yield put({ type: 'SAVE', payload: { totalCasesCount: data[0].total_cases } });
    },

    *FETCH_SEVERITY_COUNT({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data: severityCount } = yield call(services.fetchSeverityCount, serialize(filters));
      yield put({ type: 'SAVE', payload: { severityCount } });
    },

    *FETCH_ENGINEER_ACTIVITIES_COUNT({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data: engineerActivitiesCount } = yield call(services.fetchEngineerAcitivitesCount, serialize(filters));
      yield put({ type: 'SAVE', payload: { engineerActivitiesCount } });
    },

    *FETCH_OPEN_CASE_CLIENT_COUNT({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data } = yield call(services.fetchOpenCaseClientCount, serialize(filters));
      yield put({ type: 'SAVE', payload: { openCaseClientCount: data[0] ? data[0].number_of_cases : 0 } });
    },

    *FETCH_RESOLVED_CASE_CLIENT_COUNT({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data } = yield call(services.fetchResolvedCaseClientCount, serialize(filters));
      yield put({ type: 'SAVE', payload: { resolvedCaseClientCount: data[0] ? data[0].number_of_cases : 0 } });
    },

    *FETCH_CASE_PRODUCT_COUNT({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data: caseProductCount } = yield call(services.fetchCaseProductCount, serialize(filters));
      yield put({ type: 'SAVE', payload: { caseProductCount } });
    },

    *FETCH_VENDOR_CASE_COUNT({ payload }, { call, put, select }) {
      const { filters } = yield select(state => state.reports);
      const { data: vendorCaseCount } = yield call(services.fetchVendorCaseCount);
      yield put({ type: 'SAVE', payload: { vendorCaseCount } });
    },

    *FETCH_REPORTS_BY_FILTER({ payload }, { call, put, select }) {
      const currentFilters = yield select(state => state.reports.filters);
      const updatedFilters = { ...currentFilters, [payload.key]: [payload.value] };
      yield put({ type: 'SAVE', payload: { filters: updatedFilters } });

      yield put({ type: 'FETCH_OPEN_CASE_CLIENT_COUNT' });
      yield put({ type: 'FETCH_RESOLVED_CASE_CLIENT_COUNT' });
      yield put({ type: 'FETCH_AVERAGE_TURNAROUND_TIME' });
      yield put({ type: 'FETCH_TOTAL_CASES' });
      yield put({ type: 'FETCH_ENGINEER_ACTIVITIES_COUNT' });
      yield put({ type: 'FETCH_CASE_PRODUCT_COUNT' });
      yield put({ type: 'FETCH_SEVERITY_COUNT' });
    },
  },

  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
