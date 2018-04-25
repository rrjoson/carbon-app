import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

export function fetchTotalCases(filterQuery) {
  return request.get(`${BASE_URL}/total-cases?${filterQuery}`);
}

export function fetchSeverityCount(filterQuery) {
  return request.get(`${BASE_URL}/severity-count?${filterQuery}`);
}

export function fetchTotalCasesCount() {
  return request.get(`${BASE_URL}/severity-count/all`);
}

export function fetchEngineerAcitivitesCount(filterQuery) {
  return request.get(`${BASE_URL}/eng-activities-count?${filterQuery}`);
}

export function fetchClientWithMostCases() {
  return request.get(`${BASE_URL}/case-client-count/most`);
}

export function fetchOpenCaseClientCount(filterQuery) {
  return request.get(`${BASE_URL}/case-client-count/open?${filterQuery}`);
}

export function fetchResolvedCaseClientCount(filterQuery) {
  return request.get(`${BASE_URL}/case-client-count/resolved?${filterQuery}`);
}

export function fetchCaseProductCount(filterQuery) {
  return request.get(`${BASE_URL}/case-product-count?${filterQuery}`);
}

export function fetchProductWithMostCases() {
  return request.get(`${BASE_URL}/case-product-count/most`);
}

export function fetchVendorCaseCount() {
  return request.get(`${BASE_URL}/vendor-case-count`);
}

export function fetchAverageTurnaround(filterQuery) {
  return request.get(`${BASE_URL}/turnaround?${filterQuery}`);
}
