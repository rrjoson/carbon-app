import axios from 'axios';
import { BASE_URL } from '../constants/api';

const FETCH_ENGINEERS = `${BASE_URL}/user`;

export function fetchEngineers() {
  return axios.get(FETCH_ENGINEERS);
}

export function fetchEngineer(engineerId) {
  return axios.get(`${FETCH_ENGINEERS}/${engineerId}`);
}
