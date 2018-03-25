import axios from 'axios';

const BASE_URL = 'https://iris-carbon-api.herokuapp.com';
const ADD_LICENSE = `${BASE_URL}/license`;

export function addLicense(payload) {
  return axios.post(ADD_LICENSE, payload);
}

export function fetchLicenses() {
  return axios.get(ADD_LICENSE);
}

export function fetchLicense(licenseId) {
  return axios.get(`${ADD_LICENSE}/${licenseId}`);
}
