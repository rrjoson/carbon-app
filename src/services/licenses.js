import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const ADD_LICENSE = `${BASE_URL}/license`;

export function addLicense(payload) {
  return axios.post(ADD_LICENSE, payload);
}

export function fetchLicenses() {
  return axios.get(ADD_LICENSE);
}
