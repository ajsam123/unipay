import authApi from "../api/authApi.js";

/* PAYMENT */
export const payment = async (slug, data) => {
  const res = await authApi.post(`/api/links/${slug}/pay`, data);
  return res.data;
};
