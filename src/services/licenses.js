import axios from 'axios';
import { BASE_URL } from '../constants/api';

const ADD_LICENSE = `${BASE_URL}/license`;

export function addLicense(payload) {
  return axios.post(ADD_LICENSE, payload);
}

export function updateLicense(licenseId, payload) {
  return axios.put(`${ADD_LICENSE}/${licenseId}`, payload);
}

export function fetchLicenses() {
  return axios.get(ADD_LICENSE);
}

export function fetchLicense(licenseId) {
  return axios.get(`${ADD_LICENSE}/${licenseId}`);
}
