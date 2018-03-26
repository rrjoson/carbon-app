import axios from 'axios';
import { BASE_URL } from '../constants/api';

const FETCH_ALL_CASES = `${BASE_URL}/glocalid`;
const FETCH_CASE = `${BASE_URL}/glocalid`;
const CREATE_CASE = `${BASE_URL}/glocalid`;
const FETCH_CASES_BY_QUERY = `${BASE_URL}/glocalid/search`;
const FETCH_CASES_BY_FILTER = `${BASE_URL}/glocalid/filter`;
const FETCH_NEXT_ID = `${BASE_URL}/nextid`;

export function fetchAllCases() {
  return axios.get(FETCH_ALL_CASES);
}

export function fetchCasesByQuery(searchQuery) {
  return axios.get(`${FETCH_CASES_BY_QUERY}?q=${searchQuery}`);
}

export function fetchCasesByFilter(filterQuery) {
  return axios.get(`${FETCH_CASES_BY_FILTER}?${filterQuery}`);
}

export function fetchCase(glocalId) {
  return axios.get(`${FETCH_CASE}/${glocalId}`);
}

export function createCase(data) {
  return axios.post(CREATE_CASE, data);
}

export function updateCase(payload) {
  return axios.put(`${CREATE_CASE}/${payload.glocalId}`, payload);
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
    assignedAccountManager: selectedCase.assignedAccountManager,
    assignedSystemsEngineer: selectedCase.assignedSystemsEngineer,
    case_status: selectedCase.case_status,
  };

  const updatedCase = {
    ...originalCase,
    case_status: payload,
  };

  return axios.put(`${CREATE_CASE}/${selectedCase.glocalId}`, updatedCase);
}

export function fetchNextId() {
  return axios.get(FETCH_NEXT_ID);
}

