import axios from 'axios';
import { BASE_URL } from '../constants/api';

const LOGIN_URL = `${BASE_URL}/auth/login`;

export function login(payload) {
  const config = {
    withCredentials: true,
    redirect: 'follow',
    credentials: 'include',
  };

  return axios.post(LOGIN_URL, payload, config);
}

// export function login(payload) {
//   return fetch(LOGIN_URL, {
//     method: 'POST',
//     // mode: 'same-origin',
//     redirect: 'follow',
//     credentials: 'include', // Don't forget to specify this if you need cookies
//     body: JSON.stringify(payload)
//   })
// }

// export function login() {
//   return axios.get('https://iris-carbon-api.herokuapp.com/user/1');
// }