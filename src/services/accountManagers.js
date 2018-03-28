import request from '../utils/request';
import { BASE_URL } from '../constants/api';

const FETCH_ACCOUNT_MANAGERS = `${BASE_URL}/position/manager`;

export function fetchAccountManagers() {
  return request(FETCH_ACCOUNT_MANAGERS);
}
