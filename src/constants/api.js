export const DEVELOPMENT_URL = 'http://localhost:8001';
export const PRODUCTION_URL = 'https://iris-carbon-api.herokuapp.com';
export const BASE_URL = window.location.hostname === 'localhost' ? DEVELOPMENT_URL : PRODUCTION_URL;
