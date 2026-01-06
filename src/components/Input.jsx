import React, { Children } from "react";
import errorIcon from "../assets/error.svg";

const Input = ({
  label,
  leftIcon = null,
  rightIcon = null,
  hint,
  error,
  className,
  errorBorder,
  InputClassName,
  ...inputProps
}) => {
  return (
    <div className={`flex flex-col gap-1.5  ${className}`}>
      {label && (
        <label className="body-small-medium dark:text-neutral-400 text-neutral-black-13 ">
          {label}
        </label>
      )}
      <div
        className={`px-3 py-2 gap-2 rounded-xl border  focus-within:inset-shadow-custom-sm focus-within:drop-shadow-sm dark:border-neutral-600 flex w-full dark:text-white dark:bg-background bg-neutral-black-2 ${InputClassName} ${errorBorder} ${
          error ? "border-error-100 " : "border-neutral-black-5"
        } `}
        tabIndex={0}
      >
        {leftIcon && leftIcon}
        <input
          type="text"
          className="focus-within:outline-0 flex w-full"
          {...inputProps}
        />
        {rightIcon && rightIcon}
      </div>
      <div>
        {hint && (
          <span className="body-small-regular text-neutral-black-9 ">
            {hint}
          </span>
        )}
        {error && (
          <div className="flex gap-1">
            <img src={errorIcon} alt="" />
            <span className="body-small-regular text-destructive ">
              {error}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
