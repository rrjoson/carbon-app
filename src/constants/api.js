export const DEVELOPMENT_URL = 'http://localhost:8001';
export const PRODUCTION_URL = 'https://iris-carbon-api.herokuapp.com';
export const BASE_URL = window.location.hostname === 'localhost' ? DEVELOPMENT_URL : PRODUCTION_URL;

export const ACTIVITIES_URL = `${BASE_URL}/activityNo`;
export const ACTIVITIES_BY_ENGINEER_NAME_URL = `${BASE_URL}/engActivities`;
export const ACTIVITIES_BY_GLOCAL_ID_URL = `${BASE_URL}/sr-tracking`;