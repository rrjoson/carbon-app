import axios from 'axios';
import { BASE_URL } from '../constants/api';

const FETCH_PRODUCTS = `${BASE_URL}/products`;
const FETCH_PRODUCTS_OF_VENDOR = `${BASE_URL}/productvendor`;
const ADD_PRODUCT = `${BASE_URL}/products`;
const PATCH_PRODUCT = `${BASE_URL}/products`;
const DELETE_PRODUCT = `${BASE_URL}/products`;

export function fetchProducts() {
  return axios.get(FETCH_PRODUCTS);
}

export function fetchProductsOfVendor(vendor) {
  return axios.get(`${FETCH_PRODUCTS_OF_VENDOR}/${vendor}`);
}

export function addProduct(vendor, productName) {
  const data = {
    productName,
    vendor,
  };

  return axios.post(ADD_PRODUCT, data);
}

export function patchProduct(vendor, original, productName) {
  const data = {
    productName,
    vendor,
  };

  return axios.put(`${PATCH_PRODUCT}/${encodeURIComponent(original)}`, data);
}

export function deleteProduct(productName) {
  return axios.delete(`${DELETE_PRODUCT}/${encodeURIComponent(productName)}`);
}
