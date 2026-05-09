import axios from 'axios';

const BASE_URL = 'http://192.168.10.10:5000/api';

export const API = axios.create({ baseURL: BASE_URL });
