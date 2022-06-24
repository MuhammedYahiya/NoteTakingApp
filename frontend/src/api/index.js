import axios from 'axios'

const api = axios.create({ baseURL: "http://localhost:4000" });

export const setToken = (token) => {
  
  api.headers.authorization = "Bearer " + token;
};

export default api;