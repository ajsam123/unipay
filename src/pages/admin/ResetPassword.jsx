import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import lock from "./../../assets/lock-03.svg";
import Button from "../../components/Button";
import { routes } from "./../../constants/routes.js";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "../../schemas/auth.schema.js";
import { resetPassword } from "../../services/authService.js";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otp = location.state?.otp;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
      otp: otp,
      new_password: "",
      confirm_new_password: "",
    },
  });

  const submitHandler = async (val) => {
    try {
      setIsLoading(true);
      await resetPassword(val);
      toast.success("Password reset Successful. Redirecting to login...");
      navigate(routes.LOGIN);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
      navigate(routes.LOGIN);
    }
  };

  const errorHandler = (errors) => {
    console.log(errors);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h1 className="heading-3">Hi, Welcome</h1>
        <span className="text-neutral-black-9 dark:text-neutral-400 body-medium-medium">
          Reset your password
        </span>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler, errorHandler)}
        className="flex flex-col gap-4 w-full"
      >
        <Input
          {...register("new_password")}
          leftIcon={<img src={lock} alt="lock icon" />}
          label="New Password"
          type="password"
          className="w-full border-neutral-black-9"
          placeholder="Enter new password"
          error={errors.new_password?.message}
        />
        <Input
          {...register("confirm_new_password")}
          leftIcon={<img src={lock} alt="lock icon" />}
          label="Confirm Password"
          type="password"
          className="w-full border-neutral-black-9"
          placeholder="Confirm password"
          error={errors.confirm_new_password?.message}
        />

        <Button isLoading={isLoading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
