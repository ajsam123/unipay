import { useLocation, useNavigate } from "react-router";
import { routes } from "../../constants/routes";
import OtpForm from "../../components/OtpForm";
import { resendOtp, verifyLoginOtp } from "../../services/authService";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const LoginOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [isLoading, setIsLoading] = useState(false);

  // Safety: redirect if accessed directly
  useEffect(() => {
    if (!email) {
      navigate(routes.LOGIN);
    }
  }, [email, navigate]);

  const handleSubmit = async (otpCode, setError) => {
    try {
      setIsLoading(true);

      await verifyLoginOtp({
        email,
        otp: otpCode,
      });

      toast.success("Login successful");
      navigate(routes.DASHBOARD);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Invalid or expired OTP";

      setError(message);
      toast(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsLoading(true);
      await resendOtp({ email });
      toast.success("OTP resent successfully");
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Failed to resend OTP";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OtpForm
      email={email}
      title="Confirm Login"
      subtitle="Enter the code sent to"
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onResend={handleResend}
    />
  );
};

export default LoginOtp;
