import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const FETCH_PRODUCTS = `${BASE_URL}/products`;
const ADD_PRODUCT = `${BASE_URL}/products`;
const PATCH_PRODUCT = `${BASE_URL}/products`;
const DELETE_PRODUCT = `${BASE_URL}/products`;

export function fetchProducts() {
  return axios.get(FETCH_PRODUCTS);
}

export function addProduct(vendor, productname) {
  const data = {
    'productName': productname,
    'vendor': vendor,
  };
  return axios.post(ADD_PRODUCT, data);
}

export function patchProduct(vendor, original, productname) {
  const data = {
    'productName': productname,
    'vendor': vendor,
  };

  return axios.put(`${PATCH_PRODUCT}/${encodeURIComponent(original)}`, data);
}

export function deleteProduct(productname) {
  return axios.delete(`${DELETE_PRODUCT}/${encodeURIComponent(productname)}`);
}
