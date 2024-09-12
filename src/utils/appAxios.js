import axios from "axios";
import router from '../router';
import store from '../store';

export const appAxios = axios.create({
  baseURL: "https://cgapi-f892d01b36c3.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    "Language": store.getters._language || "en"
  }
});

appAxios.interceptors.request.use(
  config => {
    const token = store.getters._token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

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
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        store.commit("logoutBusinessUser");
        router.push({ path: '/login' });
      }

      if (error.response.status === 429) {
        this.$toastr.error(`Too many requests. Please try again later`);
      }
    }

    return Promise.reject(error);
  }
);
