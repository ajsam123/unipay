import { useRef, useEffect } from "react";

const OtpInput = ({ otp, setOtp }) => {
  const inputsRef = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value, idx) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Move forward if digit entered
    if (value && idx < otp.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    // Move backward on backspace if empty
    if (e.key === "Backspace") {
      if (!otp[idx] && idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  const handlePaste = (e, startIndex) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pasted)) return;

    const digits = pasted.slice(0, otp.length - startIndex).split("");

    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      const currentIndex = startIndex + i;
      newOtp[currentIndex] = digit;
    });

    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = startIndex + digits.length - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  return (
    <div className="flex items-center md:gap-4 gap-2 mb-3">
      {otp.map((digit, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={(e) => handlePaste(e, i)}
          ref={(el) => (inputsRef.current[i] = el)}
          className={`border border-neutral-300 bg-neutral-100/25 rounded-xl
            lg:w-16 w-12 px-4 py-3 text-center focus:outline-0
            focus:border-primary-400 ${
              digit ? "border-primary-400" : ""
            }`}
        />
      ))}
    </div>
  );
};

export default OtpInput;