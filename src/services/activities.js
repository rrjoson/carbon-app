import axios from 'axios';
import { ACTIVITIES_URL } from './../constants/api';

export function updateActivity(activityNo, payload) {
  return axios.put(`${ACTIVITIES_URL}/${activityNo}`, payload);
}

export function fetchActivity(activityNo) {
  return axios.get(`${ACTIVITIES_URL}/${activityNo}`);
}

export function fetchActivities(trackingNo) {
  return axios.get(`${ACTIVITIES_URL}/${trackingNo}`);
}

export function addActivity(data) {
  return axios.post(ACTIVITIES_URL, data);
}
