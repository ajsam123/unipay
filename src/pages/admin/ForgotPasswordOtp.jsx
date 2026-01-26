import { useLocation, useNavigate } from "react-router";
import OtpForm from "../../components/OtpForm";
import { routes } from "../../constants/routes";
import { useState } from "react";
import toast from "react-hot-toast";
import { forgotPasswordOtp } from "../../services/authService";

const ForgotPasswordOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      await forgotPasswordOtp({ email, otp: data });
      toast.success("OTP verified successfully");
      navigate(routes.RESETPASSWORD);
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Invalid email or password";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <OtpForm
        email={email}
        onSubmit={handleSubmit}
        title="Reset Password Verification"
        subtitle="We sent a code to"
        isLoading={isLoading}
      />
    </div>
  );
};

export default ForgotPasswordOtp;
