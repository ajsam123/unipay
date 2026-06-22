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
  const res = await appApi.get("api/links/");
  return res.data;
};

export const deletepaymentLink = async (id) => {
  const res = await appApi.delete(`/links/${id}/delete/`);
  return res.data;
};

// ---------------- GET ALL USERS ----------------
export const getUsers = async () => {
  const res = await appApi.get("api/users/");
  return res.data;
};

// ---------------- GET PENDING VERIFICATIONS ----------------
export const getPendingVerifications = async () => {
  const res = await appApi.get("api/admin/pending-verifications/");
  return res.data;
};

// ---------------- VERIFY USER (APPROVE / DISAPPROVE) ----------------
export const verifyUser = async ({ userId: id, approved }) => {
  const res = await appApi.patch(`api/admin/verify-user/${id}/`, {
    is_id_approved: approved,
  });

  return res.data;
};

// ---------------- UPDATE USER ----------------
export const updateUser = async (data) => {
  const res = await appApi.patch("api/users/user/update/", data);
  return res.data;
};

export const getTransactions = async () => {
  const res = await appApi.get("api/transactions/");
  return res.data;
};

// export const getTransactionDetails = async ({ id }) => {
//   const res = await appApi.get(`/transactions/${id}/`);
//   return res.data;
// };

export const getTransactionsByLink = async ({ id }) => {
  const res = await appApi.get(`api/links/${id}/transactions/`);
  return res.data;
};

// Bank details

export const getBankDetails = async () => {
  const res = await appApi.get("/bank-details/me/");
  return res.data;
};
