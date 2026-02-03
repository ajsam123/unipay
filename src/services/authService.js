import authApi from "../api/authApi.js";

/* SIGNUP */
export const signup = async (data) => {
  const res = await authApi.post("/api/auth/register/", data);
  return res.data;
};

/* LOGIN */
export const login = async (data) => {
  const res = await authApi.post("/api/auth/login/", data);
  return res.data;
};

/* VERIFY EMAIL */
export const verifyEmail = async (data) => {
  const res = await authApi.post("/api/auth/verify-email/", data);

  return res.data;
};

/* VERIFY LOGIN OTP */
export const verifyLoginOtp = async (data) => {
  const res = await authApi.post("/api/auth/login/verify-otp/", data);

  const { access_token, refresh_token } = res.data;

  localStorage.setItem("access", access_token);
  localStorage.setItem("refresh", refresh_token);

  return res.data;
};

/* FORGOT PASSWORD */
export const forgotPassword = async (data) => {
  const res = await authApi.post("/api/auth/forgot-password/", data);
  return res.data;
};

/* RESET PASSWORD */
export const resetPassword = async (data) => {
  const res = await authApi.post("/api/auth/reset-password/", data);
  return res.data;
};

/* FORGOT PASSWORD OTP */
export const forgotPasswordOtp = async (data) => {
  const res = await authApi.post("/api/auth/password/verify-otp/", data);
  return res.data;
};

/* RESEND OTP */
export const resendOtp = async (data) => {
  const res = await authApi.post("/api/auth/resend-otp/", data);
  return res.data;
};



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
