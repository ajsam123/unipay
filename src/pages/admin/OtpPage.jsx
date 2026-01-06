import React, { useEffect, useRef, useState } from "react";
// import { ChevronLeft } from "lucide-react";
import Button from "../../components/Button";
// import ChevronLeftComp from "../components/ChevronLeft";
import { useLocation, useNavigate } from "react-router";
import { routes } from "../../constants/routes";

const OtpPage = () => {
  const location = useLocation();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const email = location.state?.email;
  const inputsRef = useRef([]);

  const handleChange = (value, idx) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);

      if (value && idx < otp.length - 1) {
        inputsRef.current[idx + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const handleSumit = () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Otp not complete");
      return;
    }

    // navigate("/resetpassword", { state: { otp: otpCode, email: email } });
  };

  const resendCode = async () => {
    try {
      setIsLoading(true);
      //   await forgotPassword(email);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate(routes.LOGIN);
    }
  }, [email, navigate]);
  return (
    <section className=" w-full max-w-[550px] relative">
      {/* <ChevronLeftComp /> */}
      <div className="items-center flex flex-col gap-7">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="md:heading-3 heading-3">Email confirmation</h1>
          <p className="text text-neutral-600">
            We sent a code to{" "}
            <span className="font-medium text-black">{email}</span>
          </p>
        </div>
        <div className="flex items-start gap-4 flex-col">
          <div className="flex items-center md:gap-4 gap-2 mb-3">
            {otp.map((digit, i) => (
              <input
                type="text"
                key={i}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => (inputsRef.current[i] = el)}
                className={` border border-neutral-300 bg-neutral-100/25 rounded-xl lg:w-16 w-12 px-4 py-3 text-center focus:outline-0 focus:border-primary-400 ${
                  digit ? "border-primary-400" : ""
                }`}
                placeholder=""
              />
            ))}
          </div>
          {error && <p className="text-error-100 text-sm">{error}</p>}
          <p className="text text-neutral-600">
            Didn't receive code?{" "}
            <span
              className="font-medium text-black cursor-pointer"
              onClick={resendCode}
            >
              Click to resend code
            </span>
          </p>
          <Button
            className="w-full mt-3 h-10"
            type="submit"
            onClick={handleSumit}
          >
            {" "}
            Confirm
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OtpPage;
