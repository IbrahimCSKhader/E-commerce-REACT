import axios from "axios";
import AuthStore from "../store/AuthStore";

const instance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api/",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "ar",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = AuthStore.getState().token || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token added to headers", config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
