import appApi from "../api/appApi";

/* ONBOARDING */
export const onboarding = async (data) => {
  const res = await appApi.post("/api/users/onboarding/", data);
  return res.data;
};

export const getBanks = async () => {
  const res = await appApi.get("/api/banks/");
  return res.data;
};

export const resolveAccount = async (data) => {
  const res = await appApi.post("/api/payouts/resolve-account/", data);
  return res.data;
};

export const createSubaccount = async (data) => {
  const res = await appApi.post("/api/payouts/create-subaccount/", data);
  return res.data;
};

export const createPaymentLink = async (data) => {
  const res = await appApi.post("/api/link/create/", data);
  return res.data;
};

export const getPaymentLinks = async () => {
  const res = await appApi.get("/links/");
  return res.data;
};
