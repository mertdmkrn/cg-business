import axios from "axios";
import router from '../router';

export const appAxios = axios.create({
    baseURL: "https://cgappapi-ff676d91c2d7.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      "Language" : "tr"
    }
});

appAxios.interceptors.request.use(
  config => {

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) 
    {
      router.push({ path: '/login' });
    }
    return Promise.reject(error);
  }
);
