import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

export function fetchTotalCases() {
  return request.get(`${BASE_URL}/total-cases`);
}

export function fetchSeverityCount() {
  return request.get(`${BASE_URL}/severity-count`);
}

export function fetchEngineerAcitivitesCount() {
  return request.get(`${BASE_URL}/eng-activities-count`);
}

export function fetchMostCasesClientCount() {
  return request.get(`${BASE_URL}/case-client-count/most`);
}

export function fetchOpenCaseClientCount() {
  return request.get(`${BASE_URL}/case-client-count/open`);
}

export function fetchResolvedCaseClientCount() {
  return request.get(`${BASE_URL}/case-client-count/resolved`);
}

export function fetchCaseProductCount() {
  return request.get(`${BASE_URL}/case-product-count`);
}

export function fetchVendorCaseCount() {
  return request.get(`${BASE_URL}/vendor-case-count`);
}

export function fetchVendorLicenseCount() {
  return request.get(`${BASE_URL}/vendor-license-count`);
}

export function fetchAverageTurnaround() {
  return request.get(`${BASE_URL}/turnaround`);
}
