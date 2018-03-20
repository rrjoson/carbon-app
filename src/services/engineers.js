import request from '../utils/request';

const BASE_URL = 'https://iris-carbon-api.herokuapp.com';
const FETCH_ENGINEERS = `${BASE_URL}/engineer`;

export function fetchEngineers() {
  return request(FETCH_ENGINEERS);
}
