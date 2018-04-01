import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

const FETCH_CLIENTS = `${BASE_URL}/client`;
const ADD_CLIENT = `${BASE_URL}/client`;

export function fetchClients() {
  return request.get(FETCH_CLIENTS);
}

export function fetchClient(name) {
  return request.get(`${FETCH_CLIENTS}/${encodeURIComponent(name)}`);
}

export function addClient(data) {
  return request.post(ADD_CLIENT, data);
}

export function updateClient(accountName, payload) {
  return request.put(`${ADD_CLIENT}/${accountName}`, payload);
}
