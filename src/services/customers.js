
import request from '../utils/request';

const BASE_URL = 'https://iris-carbon-api.herokuapp.com';
const FETCH_CUSTOMERS = `${BASE_URL}/contactp`;

export function fetchCustomers() {
  return request(FETCH_CUSTOMERS);
}
