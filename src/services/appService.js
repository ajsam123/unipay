import appApi from "../api/appApi";

/* ONBOARDING */
export const onboarding = async (data) => {
  const res = await appApi.post("/api/users/onboarding/", data);
  return res.data;
};

/* DASHBOARD */
export const getDashboardData = async () => {
  const res = await appApi.get("/api/dashboard/summary/");
  return res.data;
};

/* Fetch banks and their codes */

export const getBanks = async () => {
  const res = await appApi.get("/api/banks/");
  return res.data;
};

/* Get account name using account code and account number */
export const resolveAccount = async (data) => {
  const res = await appApi.post("/api/payouts/resolve-account/", data);
  return res.data;
};

/**Create subaccount using bank details */
export const createSubaccount = async (data) => {
  const res = await appApi.post("/api/payouts/create-subaccount/", data);
  return res.data;
};

/**Create payment link */

export const createPaymentLink = async (data) => {
  const res = await appApi.post("/api/link/create/", data);
  return res.data;
};

/**Get all payment Links */

export const getPaymentLinks = async () => {
  const res = await appApi.get("api/links/");
  return res.data;
};

/**Delete a particular payment Link  */

export const deletepaymentLink = async (id) => {
  const res = await appApi.delete(`api/links/${id}/delete/`);
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

// Get total transactions

export const getTransactions = async () => {
  const res = await appApi.get("api/transactions/");
  return res.data;
};

// Get each transaction Details
export const getTransactionDetails = async ({ id }) => {
  const res = await appApi.get(`/api/transactions/${id}/`);
  return res.data;
};

// Fetching transaction by link

export const getTransactionsByLink = async ({ id }) => {
  const res = await appApi.get(`api/links/${id}/transactions/`);
  return res.data;
};

// Get Bank details
export const getBankDetails = async () => {
  const res = await appApi.get("api/bank-details/me/");
  return res.data;
};

// Edit/Update Bank Details
export const updateBankDetails = async (data) => {
  const res = await appApi.patch("api/bank-details/update/", data);
  return res.data;
};

//  Verify payment
export const verifyPayment = async ({ reference }) => {
  const res = await appApi.get(`api/payments/verify?reference=${reference}`);
  return res.data;
};

// Download receipt
export const downloadReceipt = async ({ reference }) => {
  const res = await appApi.get(`api/payments/receipt?reference=${reference}`, {
    responseType: "blob",
  });
  return res.data;
};

// Logout
export const logout = async (data) => {
  const res = await appApi.post("api/auth/logout/", data);

  return res.data;
};

//  Get super admin user info

export const getAdminInfo = async () => {
  const res = await appApi.get("api/api/admin/me");
  return res.data;
};

// Get super Admin Dashboard data
export const getAdminDashboard = async () => {
  const res = await appApi.get("api/admin/dashboard/");
  return res.data;
};

export const getAllUsers = async () => {
  const res = await appApi.get("api/admin/users/");
  return res.data;
};

export const getUserDetails = async ({ id }) => {
  const res = await appApi.get(`/api/admin/users/${id}`);
  return res.data;
};
