import axios from "axios";
import AuthStore from "../store/AuthStore";
import i18n from "../i18n";
const instance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api/",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": i18n.language,
  },
});

instance.interceptors.request.use(
  (config) => {
    // Ensure we send the current language with every request
    config.headers["Accept-Language"] = i18n.language || "en";

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

// Also keep axios defaults in sync when language changes
i18n.on &&
  i18n.on("languageChanged", (lng) => {
    instance.defaults.headers["Accept-Language"] = lng;
    console.log("axios default Accept-Language set to", lng);
  });

export default instance;
