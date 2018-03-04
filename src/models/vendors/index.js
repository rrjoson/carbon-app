import { fetchVendors, createVendor, deleteVendor, patchVendor } from './../../services/vendors';
import { getChanges } from './../../utils/crud';

export default {

  namespace: 'vendors',

  state: {
    data: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/cases/add') {
          dispatch({ type: 'FETCH_VENDORS' });
        }
        if (pathname === '/vendors/edit') {
          dispatch({ type: 'FETCH_VENDORS' });
        }
      });
    },
  },

  effects: {
    *FETCH_VENDORS({ payload }, { call, put }) {
      const { data } = yield call(fetchVendors);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *SAVE_VENDORS({ payload }, { call, put, select, all }) {
      const data = yield select(state => state.vendors.data);
      const original = {};
      data.forEach((item) => { original[item.principal] = item.principal });

      const updated = payload.names;

      const list = getChanges(original, updated);
      const { toDelete, toCreate, toUpdate } = list;

      yield all(toCreate.map(item => call(createVendor, item.value)));
      yield all(toDelete.map(item => call(deleteVendor, item.value)));
      yield all(toUpdate.map(item => call(patchVendor, item.key, item.value)));

      // const { data } = yield call(fetchVendors);
      // yield put({ type: 'SAVE', payload: { data } });
    },
  },


  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
