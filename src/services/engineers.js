import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

const FETCH_ENGINEERS = `${BASE_URL}/position/systemEngineer`;

export function fetchEngineers() {
  return request.get(`${BASE_URL}/position/systemEngineer`);
}

export function fetchSeLeads() {
  return request.get(`${BASE_URL}/isLead`);
}

export function fetchEngineer(engineerId) {
  return request.get(`${BASE_URL}/position/systemEngineer/${engineerId}`);
}
