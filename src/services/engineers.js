import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

const FETCH_ENGINEERS = `${BASE_URL}/user`;

export function fetchEngineers() {
  return request.get(FETCH_ENGINEERS);
}

export function fetchEngineer(engineerId) {
  return request.get(`${FETCH_ENGINEERS}/${engineerId}`);
}
