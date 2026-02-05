import { useRouterState, useRouter } from "@tanstack/react-router";
import OtpForm from "../../components/OtpForm";
import { routes } from "../../constants/routes";
import {  useState } from "react";
import toast from "react-hot-toast";
import { forgotPasswordOtp } from "../../services/authService";

const ForgotPasswordOtp = () => {
  const { email } = useRouterState({
    select: (state) => state.location.search,
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      await forgotPasswordOtp({ email, otp: data });
      toast.success("OTP verified successfully");
      router.navigate({
        to: routes.RESETPASSWORD,
        search: { email, otp: data },
      });
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
