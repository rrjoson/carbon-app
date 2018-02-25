import axios from 'axios';
import { ACTIVITIES_URL } from './../constants/api';

export function addActivity(data) {
  return axios.post(ACTIVITIES_URL, data);
}
