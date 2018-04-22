import { request } from '../utils/request';
import { BASE_URL } from '../constants/api';

export function addActivity(activity) {
  return request.post(`${BASE_URL}/activityNo`, activity);
}

export function fetchActivity(activityNo) {
  return request.get(`${BASE_URL}/activityNo/${activityNo}`);
}

export function fetchActivities(glocalId) {
  return request.get(`${BASE_URL}/tracking/${glocalId}`);
}

export function updateActivity(activityNo, payload) {
  return request.put(`${BASE_URL}/activityNo/${activityNo}`, payload);
}

export function updateServiceReport(activityNo, serviceReportNo, payload) {
  return request.put(`${BASE_URL}/service-reports/${activityNo}/${serviceReportNo}`, payload);
}

export function deleteActivity(activityNo) {
  return request.delete(`${BASE_URL}/activityNo/${activityNo}`);
}

export function deleteServiceReport(activityNo, serviceReportNo, payload) {
  return request.delete(`${BASE_URL}/service-reports/${activityNo}/${serviceReportNo}`);
}

export function fetchActivitiesByEngineerName(engineerName) {
  return request.get(`${BASE_URL}/engActivities/{${engineerName}}`);
}
