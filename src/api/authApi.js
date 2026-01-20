import axios from "axios";

const authApi = axios.create({
  baseURL: "https://student-rxt6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;
