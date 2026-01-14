import { useState } from "react";
import Button from "./Button";
import OtpInput from "./OtpInput";

const OtpForm = ({ email, onSubmit, onResend, title, subtitle, isLoading }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("OTP not complete");
      return;
    }

    setError(null);
    await onSubmit(otpCode, setError);
  };

  return (
    <section className="w-full relative">
      <div className="items-center flex flex-col gap-7">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="md:heading-3 heading-3">{title}</h1>
          <p className="text text-neutral-600">
            {subtitle} <span className="font-medium text-black">{email}</span>
          </p>
        </div>

        <div className="flex items-start gap-4 flex-col">
          <OtpInput otp={otp} setOtp={setOtp} />

          {error && <p className="text-error-100 text-sm">{error}</p>}

          <p className="text text-neutral-600">
            Didn't receive code?{" "}
            <span
              className="font-medium text-black cursor-pointer"
              onClick={onResend}
            >
              Click to resend code
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
