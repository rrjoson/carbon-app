import { BASE_URL } from '../constants/api';
import { request } from '../utils/request';

const LOGIN_URL = `${BASE_URL}/auth/login`;
const LOGOUT_URL = `${BASE_URL}/auth/logout`;

const ADD_USER_URL = `${BASE_URL}/auth/signup`;
const ACCOUNT_URL = `${BASE_URL}/user`;
const ACCOUNT_URL_ME = `${BASE_URL}/user`;
const ACCOUNT_EDIT_URL = `${BASE_URL}/user/employee`;
const ACCOUNT_DIRECTOR_EDIT_URL = `${BASE_URL}/user/director`;
const UPDATE_USER_STATUS_URL = `${BASE_URL}/user/director/status`;

export function login(payload) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  return fetch(LOGIN_URL, {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return response.json();
    })
    .then(data => ({ data }));
}

export function logout() {
  return request.get(LOGOUT_URL);
}

export function addUser(payload) {
  return request.post(ADD_USER_URL, payload);
}

export function fetchAccounts(payload) {
  return request.get(ACCOUNT_URL);
}

export function fetchAdminAccounts(payload) {
  return request.get(`${BASE_URL}/position/admin`);
}

export function fetchRegularAccounts(payload) {
  return request.get(`${BASE_URL}/position/others`);
}

export function fetchAccount(id) {
  return request.get(`${ACCOUNT_URL_ME}/${id}`);
}

export function updateStatus(id, isActive) {
  return request.put(`${UPDATE_USER_STATUS_URL}/${id}`, { is_active: isActive });
}

export function updateUser(id, payload) {
  return request.put(`${ACCOUNT_EDIT_URL}/${id}`, payload);
}

export function updateOwnPassword(id, payload) {
  return request.put(`${ACCOUNT_URL_ME}/password/${id}`, payload);
}

export function updateAccountPassword(id, payload) {
  return request.put(`${ACCOUNT_DIRECTOR_EDIT_URL}/password/${id}`, payload);
}

export function updateOtherUser(id, payload) {
  return request.put(`${ACCOUNT_DIRECTOR_EDIT_URL}/${id}`, payload);
}
