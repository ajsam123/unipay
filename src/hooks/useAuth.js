// hooks/useAuth.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { loginUser, getCurrentUser } from "../services/appService";
import {
  login,
  signup,
  verifyEmail,
  verifyLoginOtp,
} from "../services/authService";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/getErrorMessage";

export function useAuth() {
  const queryClient = useQueryClient();

  // Signup mutation
  const signUpMutation = useMutation({
    mutationFn: signup,
    onError: (error) => {
      handleApiError(error);
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong";

      toast.error(message);
    },
  });

  const verifyLoginOtpMutation = useMutation({
    mutationFn: verifyLoginOtp,
    onSuccess: (data) => {
      localStorage.setItem("access", data.access_token);
      localStorage.setItem("refresh", data.refresh_token);
      queryClient.invalidateQueries(["me"]);
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
  });

  // Fetch current user
  // const { data: user, isLoading } = useQuery({
  //   queryKey: ["me"],
  //   queryFn: getCurrentUser,
  //   enabled: !!localStorage.getItem("accessToken"),
  // });

  return {
    loginMutation,
    verifyLoginOtpMutation,
    signUpMutation,
    verifyEmailMutation,
  };
}
