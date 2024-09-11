import axios from "axios";
import router from '../router';
import store from '../store';

export const appAxios = axios.create({
    baseURL: "https://cgapi-f892d01b36c3.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      "Language" : store.getters._language || "en",
      "Access-Control-Allow-Origin" : "*"
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
    if (error.response && (error.response.status === 401 || error.response.status === 403)) 
    {
      this.$store.commit("logoutBusinessUser");
      this.$router.push({ path: '/login' });
    }
    return Promise.reject(error);
  }
);
