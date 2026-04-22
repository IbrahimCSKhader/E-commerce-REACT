import axios from "axios";
import i18n from "../i18n";
import useAuthStore from "../store/AuthStore";
import { readPersistedAuthState } from "../utils/auth";

const instance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api/",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": i18n.language,
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = i18n.language || "en";

    const currentStoreState = useAuthStore.getState();
    const persistedState = readPersistedAuthState();
    const token = currentStoreState.token || persistedState?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const { token, logout } = useAuthStore.getState();
      if (token) {
        logout();
      }
    }

    return Promise.reject(error);
  },
);

i18n.on("languageChanged", (lng) => {
  instance.defaults.headers["Accept-Language"] = lng;
});

export default instance;
