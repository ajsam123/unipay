import { useRouter, useRouterState } from "@tanstack/react-router";
import { resendOtp, verifyLoginOtp } from "../../services/authService";
import OtpForm from "../../components/OtpForm";
import toast from "react-hot-toast";
import { routes } from "../../constants/routes";
import { useState } from "react";

const LoginOtp = () => {
  const router = useRouter();
  const { email } = useRouterState({
    select: (state) => state.location.search,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (otp, setError) => {
    try {
      setIsLoading(true);

      await verifyLoginOtp({ email, otp });

      toast.success("Login Succesful");

      router.navigate({ to: routes.DASHBOARD });
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Invalid or expired OTP";

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsLoading(true);
      await resendOtp({ email });
      toast.success("OTP resent");
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
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
