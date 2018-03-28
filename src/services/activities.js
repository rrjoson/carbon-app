import axios from 'axios';
import {
  ACTIVITIES_URL,
  ACTIVITIES_BY_ENGINEER_NAME_URL,
  ACTIVITIES_BY_GLOCAL_ID_URL,
} from './../constants/api';

export function updateActivity(activityNo, payload) {
  return axios.put(`${ACTIVITIES_URL}/${activityNo}`, payload);
}

export function fetchActivity(activityNo) {
  return axios.get(`${ACTIVITIES_URL}/${activityNo}`);
}

export function fetchActivities(glocalId) {
  return axios.get(`${ACTIVITIES_BY_GLOCAL_ID_URL}/${glocalId}`);
}

export function fetchActivitiesByEngineerName(engineerName) {
  return axios.get(`${ACTIVITIES_BY_ENGINEER_NAME_URL}/{${engineerName}}`);
}

export function addActivity(data) {
  return axios.post(ACTIVITIES_URL, data);
}

export function deleteActivity(activityNo) {
  return axios.delete(`${ACTIVITIES_URL}/${activityNo}`);
}

