// hooks/useAuth.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  signup,
  verifyEmail,
  verifyLoginOtp,
  resendOtp,
} from "../services/authService";
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
      handleApiError(error);
    },
  });

  const verifyLoginOtpMutation = useMutation({
    mutationFn: verifyLoginOtp,
    onSuccess: (data) => {
      localStorage.setItem("access", data.access_token);
      localStorage.setItem("refresh", data.refresh_token);
      // queryClient.invalidateQueries(["me"]);
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: resendOtp,
    onError: (error) => {
      handleApiError(error);
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      console.log(data);
      // queryClient.invalidateQueries(["me"]);
    },
    onError: (error) => {
      handleApiError(error);
    },
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
    resendOtpMutation,
  };
}
