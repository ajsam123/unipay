import { useRouter, useRouterState } from "@tanstack/react-router";
import OtpForm from "../../components/OtpForm";
import toast from "react-hot-toast";
import { routes } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { verifyEmailMutation, resendOtpMutation } = useAuth();
  const isLoading =
    verifyEmailMutation.isPending || resendOtpMutation.isPending;
  const { email } = useRouterState({
    select: (state) => state.location.search,
  });

  const handleVerify = (otp) => {
    verifyEmailMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          toast.success("Email verified successfully");
          router.navigate({ to: routes.ONBOARDINGONE });
        },
      },
    );
  };

  const handleResend = () => {
    resendOtpMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("OTP resent to your email");
        },
      },
    );
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
