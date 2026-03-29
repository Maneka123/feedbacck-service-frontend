// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/feedback', // backend feedback route
});

export default api;