import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

export function updateActivity(activityNo, payload) {
  return request.put(`${BASE_URL}/activityNo/${activityNo}`, payload);
}

export function fetchActivity(activityNo) {
  return request.get(`${BASE_URL}/activityNo/${activityNo}`);
}

export function fetchActivities(glocalId) {
  return request.get(`${BASE_URL}/sr-tracking/${glocalId}`);
}

export function fetchActivitiesByEngineerName(engineerName) {
  return request.get(`${BASE_URL}/engActivities/{${engineerName}}`);
}

export function addActivity(data) {
  return request.post(`${BASE_URL}/activityNo`, data);
}

export function deleteActivity(activityNo) {
  return request.delete(`${BASE_URL}/activityNo/${activityNo}`);
}
