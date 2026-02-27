import { useEffect, useState } from "react";
import Button from "./Button";
import OtpInput from "./OtpInput";
import toast from "react-hot-toast";

const OTP_EXPIRY_TIME = 5 * 60; // 5 mins
const RESEND_COOLDOWN = 60; // 60 sec

const OtpForm = ({ email, onSubmit, onResend, title, subtitle, isLoading }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(null);
  const [expiryTime, setExpiryTime] = useState(OTP_EXPIRY_TIME);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Expiry countdown
  useEffect(() => {
    if (expiryTime <= 0) return;

    const timer = setInterval(() => {
      setExpiryTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime]);

  // Resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("OTP not complete");
      return;
    }

    if (expiryTime <= 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    setError(null);

    try {
      await onSubmit(otpCode);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Invalid or expired OTP";

      setError(message);
      toast.error(message);
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;

    onResend?.(); // let parent handle the mutation
    setResendCooldown(RESEND_COOLDOWN); // still handle cooldown in UI
    setOtp(Array(6).fill(""));
    setError(null);
  };

  return (
    <section className="w-full relative">
      <div className="items-center flex flex-col gap-7">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="md:heading-3 heading-3">{title}</h1>
          <p className="text text-neutral-600">
            {subtitle} <span className="font-medium text-black">{email}</span>
          </p>

          {expiryTime > 0 ? (
            <p className="text-sm text-neutral-500">
              OTP expires in {formatTime(expiryTime)}
            </p>
          ) : (
            <p className="text-sm text-error-100">
              OTP expired. Please resend.
            </p>
          )}
        </div>

        <div className="flex items-start gap-4 flex-col">
          <OtpInput otp={otp} setOtp={setOtp} />

          {error && <p className="text-error-100 text-sm">{error}</p>}

          <p className="text text-neutral-600">
            Didn't receive code?{" "}
            <span
              onClick={handleResend}
              className={`font-medium ${
                resendCooldown > 0
                  ? "text-neutral-400 cursor-not-allowed"
                  : "text-black cursor-pointer"
              }`}
            >
              {resendCooldown > 0
                ? `Resend in ${formatTime(resendCooldown)}`
                : "Click to resend code"}
            </span>
          </p>

          <Button
            className="w-full mt-3 h-10"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OtpForm;
