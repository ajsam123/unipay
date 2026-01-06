import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import mail from "./../../assets/mail-01.svg";
import lock from "./../../assets/lock-03.svg";
import Button from "../../components/Button";
import { routes } from "./../../constants/routes.js";
import { Link } from "react-router";
import { loginschema } from "../../schemas/auth.schema.js";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginschema),
    values: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (val) => {
    try {
      setIsLoading(true);
      console.log(val);
      // setError(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const errorHandler = (val) => {
    console.log(val);
  };
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h1 className="heading-3">Hi, Welcome</h1>
        <span className="text-neutral-black-9 dark:text-neutral-400 body-medium-medium">
          Please login your account
        </span>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler, errorHandler)}
        className="flex flex-col gap-4 w-full"
      >
        <div></div>
        <Input
          {...register("email")}
          leftIcon={<img src={mail} alt="mail icon" />}
          label="Email"
          className="w-full border-neutral-black-9"
          placeholder="Your email"
          error={errors.email?.message}
        />

        <Input
          leftIcon={<img src={lock} alt="mail icon" />}
          label="Password"
          className="w-full border-neutral-black-9"
          placeholder="Your password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button isLoading={isLoading}>Login</Button>
      </form>
      <div className="text-center flex flex-col gap-4">
        <span>forgot password?</span>
        <span>
          Don't have an account?{" "}
          <Link className="text-neutral-black-9" to={routes.SIGNUP}>
            Sign up
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Login;
