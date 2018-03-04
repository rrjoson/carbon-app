import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const FETCH_ALL_CASES = `${BASE_URL}/glocalid`;
const FETCH_CASE = `${BASE_URL}/glocalid`;
const CREATE_CASE = `${BASE_URL}/glocalid`;
const FETCH_NEXT_ID = `${BASE_URL}/nextid`;

export function fetchAllCases() {
  return axios.get(FETCH_ALL_CASES);
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
    vendorCaseId: selectedCase.vendorcaseid,
    dateIdCreated: selectedCase.dateidcreated,
    dateRaised: selectedCase.dateraised,
    caseTitle: selectedCase.casetitle,
    caseDescription: selectedCase.casedescription,
    severity: selectedCase.severity,
    vendor: selectedCase.vendor,
    customer: selectedCase.customer,
    productName: selectedCase.productname,
    customerName: selectedCase.customername,
    systemsEngineerLead: selectedCase.systemsengineerlead,
    assignedAccountManager: selectedCase.assignedaccountmanager,
    assignedSystemsEngineer: selectedCase.assignedsystemsengineer,
    case_status: selectedCase.case_status,
  };

  const updatedCase = {
    ...originalCase,
    case_status: payload,
  };

  return axios.put(`${CREATE_CASE}/${selectedCase.glocalid}`, updatedCase);
}

export function fetchNextId() {
  return axios.get(FETCH_NEXT_ID);
}

