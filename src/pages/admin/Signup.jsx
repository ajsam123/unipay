import React, { useState } from "react";
import Logo from "../../components/Logo";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import mail from "./../../assets/mail-01.svg";
import lock from "./../../assets/lock-03.svg";
import Button from "../../components/Button";
import { routes } from "./../../constants/routes.js";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/auth.schema.js";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (data) => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        // setIsLoading(false);
      }, 2000);
      console.log("Registration Data:", data);
    } catch (error) {
      console.log("Registration Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const errorHandler = (errors) => {
    console.log("Form Errors:", errors);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    values: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  });
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h1 className="heading-3">Create your account</h1>
        <span className="text-neutral-black-9 dark:text-neutral-400 body-medium-medium">
          Please input to your account
        </span>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler, errorHandler)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex items-center gap-4">
          <Input
            {...register("firstname")}
            leftIcon={<img src={mail} alt="mail icon" />}
            label="First Name"
            className="w-full border-neutral-black-9"
            placeholder="Input your first name"
            error={errors.firstname?.message}
          />

          <Input
            {...register("lastname")}
            leftIcon={<img src={lock} alt="mail icon" />}
            label="Last Name"
            className="w-full border-neutral-black-9"
            placeholder="Input your last name"
            error={errors.lastname?.message}
          />
        </div>
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
          leftIcon={<img src={lock} alt="mail icon" />}
          label="Password"
          className="w-full border-neutral-black-9"
          placeholder="Your password"
          error={errors.password?.message}
        />
        <Button isLoading={isLoading}>Sign up</Button>
      </form>
      <div className="text-center flex flex-col gap-4">
        <span>forgot password?</span>
        <span>
          Already have an account?{" "}
          <Link className="text-neutral-black-9" to={routes.LOGIN}>
            Log in
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Signup;
