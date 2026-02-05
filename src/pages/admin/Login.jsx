import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, Link } from "@tanstack/react-router";

import Input from "../../components/Input";
import Button from "../../components/Button";
import mail from "./../../assets/mail-01.svg";
import lock from "./../../assets/lock-03.svg";
import { routes } from "../../constants/routes.js";
import { loginschema } from "../../schemas/auth.schema.js";
import { login } from "../../services/authService.js";
import toast from "react-hot-toast";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // use TanStack Router

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (val) => {
    try {
      setIsLoading(true);

      await login(val);

      toast.success("OTP sent to your email");

      // Navigate to Login OTP page using search params
      router.navigate({
        to: routes.LOGINOTP,
        search: { email: val.email },
      });
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Invalid email or password";

      toast.error(message);
    } finally {
      setIsLoading(false);
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
          Please log in to your account
        </span>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler, errorHandler)}
        className="flex flex-col gap-4 w-full"
      >
        <Input
          {...register("email")}
          leftIcon={<img src={mail} alt="mail icon" />}
          label="Email"
          className="w-full border-neutral-black-9"
          placeholder="Your email"
          error={errors.email?.message}
        />

        <Input
          {...register("password")}
          leftIcon={<img src={lock} alt="lock icon" />}
          label="Password"
          type="password"
          className="w-full border-neutral-black-9"
          placeholder="Your password"
          error={errors.password?.message}
        />

        <Button isLoading={isLoading} type="submit">
          Login
        </Button>
      </form>

      <div className="text-center flex flex-col gap-4">
        <Link to={routes.FORGOTPASSWORD}>
          <span>Forgot password?</span>
        </Link>
        <span>
          Don't have an account?{" "}
          <Link className="text-neutral-black-9" to={routes.SIGNUP}>
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
