import { useLocation, useNavigate } from "react-router";
import { verifyEmail, resendOtp } from "../../services/authService";
import OtpForm from "../../components/OtpForm";
import toast from "react-hot-toast";
import { routes } from "../../constants/routes";
import { useState } from "react";

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (otp, setError) => {
    try {
      setIsLoading(true);
      await verifyEmail({ email, otp });
      toast.success("Email verified successfully");
      navigate(routes.LOGIN);
    } catch (error) {
      setError(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Invalid or expired OTP"
      );
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
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OtpForm
      email={email}
      title="Email confirmation"
      subtitle="We sent a code to"
      isLoading={isLoading}
      onSubmit={handleVerify}
      onResend={handleResend}
    />
  );
};

export default VerifyEmailPage;
