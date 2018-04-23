import { request } from '../utils/request';
import { BASE_URL } from './../constants/api';

export function fetchCustomersByClient(accountName) {
  return request.get(`${BASE_URL}/client-contact/${accountName}`);
}
