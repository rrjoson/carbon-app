import axios from 'axios';
import { ACTIVITIES_URL } from './../constants/api';

export function fetchActivities(trackingNo) {
  return axios.get(`${ACTIVITIES_URL}/${trackingNo}`);
}

export function addActivity(data) {
  return axios.post(ACTIVITIES_URL, data);
}
