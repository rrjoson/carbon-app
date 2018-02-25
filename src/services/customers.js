
import request from '../utils/request';

const BASE_URL = 'http://localhost:8000';
const FETCH_CUSTOMERS = `${BASE_URL}/contactp`;

export function fetchCustomers() {
  return request(FETCH_CUSTOMERS);
}
