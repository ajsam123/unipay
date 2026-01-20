import authApi from "../api/authApi.js";

/* SIGNUP */
export const signup = (data) => authApi.post("api/auth/register/", data);

export const login = async (data) => {
  const res = await authApi.post("api/auth/login/", data);

  localStorage.setItem("access", res.access_token);
  localStorage.setItem("refresh", res.refresh_token);

  return res.data;
};

export const verifyEmail = (data) =>
  authApi.post("/api/auth/verify-email/", data);

export const verifyLoginOtp = (data) =>
  authApi.post("/api/auth/login/verify-otp/", data);

export const forgotPassword = (data) => {
 authApi.post("/api/auth/forgot-password/")
}

export const resetPassword = (data) => {
 authApi.post("/api/auth/reset-password/")
}

export const resendOtp = (data) => authApi.post("/api/auth/resend-otp/", data);

/* LOGIN */


/* CURRENT USER */
export const getMe = async () => {
  const res = await authApi.get("/auth/users/me/");
  return res.data;
};

/* LOGOUT */
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
