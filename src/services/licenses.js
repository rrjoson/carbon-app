import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

const ADD_LICENSE = `${BASE_URL}/license`;

export function addLicense(payload) {
  return request.post(ADD_LICENSE, payload);
}

export function updateLicense(licenseId, payload) {
  return request.put(`${ADD_LICENSE}/${licenseId}`, payload);
}

export function fetchLicenses() {
  return request.get(ADD_LICENSE);
}

export function fetchLicensesByQuery(searchQuery) {
  return request.get(`${ADD_LICENSE}?q=${searchQuery}`);
}

export function fetchLicense(licenseId) {
  return request.get(`${ADD_LICENSE}/${licenseId}`);
}
