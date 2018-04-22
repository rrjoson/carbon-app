import { request } from '../utils/request';
import { BASE_URL } from './../constants/api';

const FETCH_CUSTOMERS = `${BASE_URL}/contactp`;

export function fetchCustomers() {
  return request.get(FETCH_CUSTOMERS);
}

export function fetchCustomersByClient(accountName) {
  return request.get(`${BASE_URL}/client-contact/${accountName}`);
}
