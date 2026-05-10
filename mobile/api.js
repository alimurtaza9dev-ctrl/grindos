import axios from 'axios';

const BASE_URL = 'https://babbling-copier-backfire.ngrok-free.dev/api';

export const API = axios.create({ 
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});