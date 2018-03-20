import axios from 'axios';

const BASE_URL = 'https://iris-carbon-api.herokuapp.com';
const FETCH_VENDORS = `${BASE_URL}/vendor`;
const FETCH_VENDORS_OF_CLIENT = `${BASE_URL}/vendor`;
const CREATE_VENDOR = `${BASE_URL}/vendor`;
const PATCH_VENDOR = `${BASE_URL}/vendor`;
const DELETE_VENDOR = `${BASE_URL}/vendor`;

export function fetchVendors() {
  return axios.get(FETCH_VENDORS);
}

export function fetchVendorsOfClient(client) {
  return axios.get(`${FETCH_VENDORS_OF_CLIENT}/${client}`);
}

export function createVendor(name) {
  const data = { 'principal': name };
  return axios.post(CREATE_VENDOR, data);
}

export function patchVendor(original, updated) {
  const data = { 'principal': updated };

  return axios.put(`${PATCH_VENDOR}/${encodeURIComponent(original)}`, data);
}

export function deleteVendor(name) {
  return axios.delete(`${CREATE_VENDOR}/${encodeURIComponent(name)}`);
}
