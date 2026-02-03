// api/api.js
import axios from "axios";
import authApi from "./authApi";

const appApi = axios.create({
  baseURL: "https://student-rxt6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

appApi.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

appApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const res = await authApi.post("/api/token/refresh/", {
          refresh: refresh,
        });

        const newAccess = res.data.access_token;

        localStorage.setItem("access", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return appApi(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default appApi;
