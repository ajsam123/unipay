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
