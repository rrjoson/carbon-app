import request from '../utils/request';

const BASE_URL = 'https://iris-carbon-api.herokuapp.com';
const FETCH_ACCOUNT_MANAGERS = `${BASE_URL}/accountmanager`;

export function fetchAccountManagers() {
  return request(FETCH_ACCOUNT_MANAGERS);
}
