import { useRouter, useRouterState } from "@tanstack/react-router";
import OtpForm from "../../components/OtpForm";
import toast from "react-hot-toast";
import { routes } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

const LoginOtp = () => {
  const router = useRouter();
  const { verifyLoginOtpMutation, resendOtpMutation } = useAuth()
  const isLoading =
  verifyLoginOtpMutation.isPending ||
  resendOtpMutation.isPending;

  const { email } = useRouterState({
    select: (state) => state.location.search,
  });

  const handleLogin = (otp) => {
    verifyLoginOtpMutation.mutate({ email, otp }, {
      onSuccess: () => {
        toast.success("Login successful");
        router.navigate({ to: routes.DASHBOARD });
      },
    });
  };

  const handleResend =  () => {
    resendOtpMutation.mutate({ email }, {
      onSuccess: () => {
        toast.success("OTP resent to your email");
      },
    });
  };

  return (
    <OtpForm
      email={email}
      title="Login verification"
      subtitle="We sent a code to"
      isLoading={isLoading}
      onSubmit={handleLogin}
      onResend={handleResend}
    />
  );
};

export default LoginOtp;
