import axios from "axios";

const fetchAxios = axios.create({
  baseURL: 'http://localhost:1515/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

fetchAxios.interceptors.request.use((config) => {
  const sessionToken = sessionStorage.getItem('token');
  const localToken = localStorage.getItem('token');

  const token = localToken || sessionToken;

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

export default fetchAxios;