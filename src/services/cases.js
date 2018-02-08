import request from '../utils/request';

const BASE_URL = 'http://localhost:8000';
const FETCH_ALL_CASES = `${BASE_URL}/glocalid`;

export function fetchAllCases() {
  return request(FETCH_ALL_CASES);
}

