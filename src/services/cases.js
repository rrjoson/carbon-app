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
  console.warn(payload)
  return axios.put(`${CREATE_CASE}/${payload.glocalId}`, payload);
}

export function fetchNextId() {
  return axios.get(FETCH_NEXT_ID);
}

