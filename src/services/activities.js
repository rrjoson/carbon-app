import { request } from '../utils/request';
import {
  ACTIVITIES_URL,
  ACTIVITIES_BY_ENGINEER_NAME_URL,
  ACTIVITIES_BY_GLOCAL_ID_URL,
} from './../constants/api';

export function updateActivity(activityNo, payload) {
  return request.put(`${ACTIVITIES_URL}/${activityNo}`, payload);
}

export function fetchActivity(activityNo) {
  return request.get(`${ACTIVITIES_URL}/${activityNo}`);
}

export function fetchActivities(glocalId) {
  return request.get(`${ACTIVITIES_BY_GLOCAL_ID_URL}?no=${glocalId}`);
}

export function fetchActivitiesByEngineerName(engineerName) {
  return request.get(`${ACTIVITIES_BY_ENGINEER_NAME_URL}/{${engineerName}}`);
}

export function addActivity(data) {
  return request.post(ACTIVITIES_URL, data);
}

export function deleteActivity(activityNo) {
  return request.delete(`${ACTIVITIES_URL}/${activityNo}`);
}

