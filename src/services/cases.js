import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

export function fetchAllCases() {
  return request.get(`${BASE_URL}/glocalid`);
}

export function fetchCasesByQuery(searchQuery) {
  return request.get(`${BASE_URL}/glocalid?q=${searchQuery}`);
}

export function fetchCasesOfAccountManager(accountManager) {
  return request.get(`${BASE_URL}/glocalid?accountManager=${accountManager}`);
}

export function fetchCasesOfAccountManagerByFilter(accountManager, filterQuery) {
  return request.get(`${BASE_URL}/glocalid?accountManager=${accountManager}&${filterQuery}`);
}

export function fetchCasesBySeverity(severity) {
  return request.get(`${BASE_URL}/glocalid?severity=${severity}`);
}

export function fetchCasesOfAccountManagerBySeverity(accountManager, severity) {
  return request.get(`${BASE_URL}/glocalid?accountManager=${accountManager}&severity=${severity}`);
}

export function fetchCasesOfLoggedInUser(user) {
  return request.get(`${BASE_URL}/userSE?user={${user}}`);
}

export function fetchCasesOfLoggedInUserByFilter(user, filterQuery) {
  return request.get(`${BASE_URL}/userSE?user={${user}}&${filterQuery}`);
}

export function fetchCasesByFilter(filterQuery) {
  return request.get(`${BASE_URL}/glocalid?${filterQuery}`);
}

export function fetchCase(glocalId) {
  return request.get(`${BASE_URL}/glocalid/${glocalId}`);
}

export function createCase(data) {
  return request.post(`${BASE_URL}/glocalid`, data);
}

export function updateCase(payload) {
  return request.put(`${BASE_URL}/glocalid/${payload.glocalId}`, payload);
}

export function updateCaseStatus(payload, selectedCase) {
  const originalCase = {
    vendorCaseId: selectedCase.vendorCaseId,
    dateIdCreated: selectedCase.dateIdCreated,
    dateRaised: selectedCase.dateRaised,
    caseTitle: selectedCase.caseTitle,
    caseDescription: selectedCase.caseDescription,
    severity: selectedCase.severity,
    vendor: selectedCase.vendor,
    customer: selectedCase.customer,
    productName: selectedCase.productName,
    customerName: selectedCase.customerName,
    systemsEngineerLead: selectedCase.systemsEngineerLead,
    case_status: selectedCase.case_status,
  };

  const updatedCase = {
    ...originalCase,
    case_status: payload,
  };

  return request.put(`${BASE_URL}/glocalid/${selectedCase.glocalId}`, updatedCase);
}

export function fetchNextId() {
  return request.get(`${BASE_URL}/nextid`);
}

export function deleteCase(glocalId) {
  return request.delete(`${BASE_URL}/glocalid/${glocalId}`);
}
