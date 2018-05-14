import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

export function fetchClients() {
  return request.get(`${BASE_URL}/client`);
}

export function fetchClientsOfAccountManager(accountManager) {
  return request.get(`${BASE_URL}/client?accountManager=${accountManager}`);
}

export function fetchClientsByQuery(searchQuery) {
  return request.get(`${BASE_URL}/client?q=${searchQuery}`);
}

export function fetchClient(name) {
  return request.get(`${BASE_URL}/client/${encodeURIComponent(name)}`);
}

export function addClient(data) {
  return request.post(`${BASE_URL}/client`, data);
}

export function updateClient(accountName, payload) {
  return request.put(`${BASE_URL}/client/${accountName}`, payload);
}

export function deleteClient(clientName) {
  return request.delete(`${BASE_URL}/client/${clientName}`);
}
