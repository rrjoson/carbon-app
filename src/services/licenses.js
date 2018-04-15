import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

const LICENSES_URL = `${BASE_URL}/license`;

export function addLicense(payload) {
  return request.post(LICENSES_URL, payload);
}

export function updateLicense(licenseId, payload) {
  return request.put(`${LICENSES_URL}/${licenseId}`, payload);
}

export function fetchActiveLicenses() {
  return request.get(LICENSES_URL);
}

export function fetchExpiredLicenses() {
  return request.get(`${LICENSES_URL}/expired`);
}

export function fetchActiveLicensesByQuery(searchQuery) {
  return request.get(`${LICENSES_URL}?q=${searchQuery}`);
}

export function fetchExpiredLicensesByQuery(searchQuery) {
  return request.get(`${LICENSES_URL}/expired?q=${searchQuery}`);
}

export function fetchLicense(licenseId) {
  return request.get(`${LICENSES_URL}/${licenseId}`);
}
