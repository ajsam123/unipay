import axios from "axios";

const api = axios.create({
  baseURL: "https://student-rxt6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
   (HANDLE TOKEN EXPIRY)
========================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const res = await axios.post(
          "https://student-rxt6.onrender.com/auth/jwt/refresh/",
          { refresh }
        );

        localStorage.setItem("access", res.data.access);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        return api(originalRequest);
      } catch (err) {
        // Refresh failed → logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
