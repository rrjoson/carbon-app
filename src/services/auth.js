import axios from 'axios';
import { BASE_URL } from '../constants/api';

const LOGIN_URL = `${BASE_URL}/auth/login`;

export function login(payload) {
  const config = {
    withCredentials: true,
    credentials: 'same-origin',
  };

  return axios.post(LOGIN_URL, payload, config);
}
