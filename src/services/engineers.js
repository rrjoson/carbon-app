import request from '../utils/request';
import { BASE_URL } from '../constants/api';

const FETCH_ENGINEERS = `${BASE_URL}/engineer`;

export function fetchEngineers() {
  return request(FETCH_ENGINEERS);
}
