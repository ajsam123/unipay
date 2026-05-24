import React, { useState } from "react";
import Input from "./Input";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";

const PasswordInput = ({ ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div>
      <Input
        {...props}
        className="w-full border-neutral-black-9"
        leftIcon={<LockIcon className="text-neutral-black-9" />}
        type={isVisible ? "text" : "password"}
        rightIcon={
          isVisible ? (
            <EyeIcon
              className="text-neutral-black-9"
              onClick={toggleVisibility}
            />
          ) : (
            <EyeOffIcon
              className="text-neutral-black-9"
              onClick={toggleVisibility}
            />
          )
        }
      />
    </div>
  );
};

export default PasswordInput;
