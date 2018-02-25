import request from '../utils/request';

const BASE_URL = 'http://localhost:8000';
const FETCH_ENGINEERS = `${BASE_URL}/engineer`;

export function fetchEngineers() {
  return request(FETCH_ENGINEERS);
}
