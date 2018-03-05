import { notification } from 'antd';

import {
  fetchProducts,
  addProduct,
  deleteProduct,
  patchProduct,
} from './../../services/products';
import { getChanges } from './../../utils/crud';

export default {

  namespace: 'products',

  state: {
    data: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/cases/add') {
          dispatch({ type: 'FETCH_PRODUCTS' });
        }
        if (pathname === '/products/edit') {
          dispatch({ type: 'FETCH_PRODUCTS' });
        }
      });
    },
  },

  effects: {
    *FETCH_PRODUCTS({ payload }, { call, put }) {
      const { data } = yield call(fetchProducts);
      yield put({ type: 'SAVE', payload: { data } });
    },

    *SAVE_PRODUCTS({ payload }, { call, put, select, all }) {
      const productsData = yield select(state => state.products.data);
      const vendorsData = yield select(state => state.vendors.data);
      const original = {};

      vendorsData.forEach((item) => {
        original[item.principal] = {}
      })

      productsData.forEach((item) => {
        original[item.vendor] = {
          ...original[item.vendor],
          [item.productname]: item.productname
        }
      });

      const updated = payload;

      const vendors = [];
      Object.entries(original).forEach(
        ([key, value]) => {
          vendors.push(key);
        }
      );

      let numberOfVendors = vendors.length;
      let index = 0;
      while (numberOfVendors !== 0) {
        const vendor = vendors[index];
        const list = getChanges(original[vendor], updated[vendor]);
        const { toDelete, toCreate, toUpdate } = list;

        yield all(toCreate.map(item => call(addProduct, vendor, item.value)));
        yield all(toDelete.map(item => call(deleteProduct, item.value)));
        yield all(toUpdate.map(item => call(patchProduct, vendor, item.key, item.value)));

        index += 1;
        numberOfVendors -= 1;
      }

      notification['success']({ message: 'Changes saved.', duration: 2 });
    },
  },


  reducers: {
    SAVE(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
