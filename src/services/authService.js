import api from "../api/admin.js";

/* SIGNUP */
export const signup = (data) => api.post("api/auth/register/", data);

/* ACTIVATE */
export const activateAccount = (data) =>
  api.post("/auth/users/activation/", data);

export const verifyEmail = (data) => api.post("/api/auth/verify-email/", data);

export const verifyLoginOtp = (data) =>
  api.post("/api/auth/login/verify-otp/", data);

export const resendOtp = (data) => api.post("/api/auth/resend-otp/", data);

/* LOGIN */
export const login = async (data) => {
  const res = await api.post("api/auth/login/", data);

  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data;
};

/* CURRENT USER */
export const getMe = async () => {
  const res = await api.get("/auth/users/me/");
  return res.data;
};

/* LOGOUT */
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
