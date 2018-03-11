import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const FETCH_CLIENTS = `${BASE_URL}/client`;
const ADD_CLIENT = `${BASE_URL}/client`;

export function fetchClients() {
  return axios.get(FETCH_CLIENTS);
}

export function fetchClient(name) {
  return axios.get(`${FETCH_CLIENTS}/${encodeURIComponent(name)}`);
}

export function addClient(data) {
  return axios.post(ADD_CLIENT, data);
}

export function updateClient(accountName, payload) {
  return axios.put(`${ADD_CLIENT}/${accountName}`, payload);
}
