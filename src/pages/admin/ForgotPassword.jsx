import React, { useState } from "react";
import TextInput from "../components/Input";
import logo from "../assets/logo.svg";
import mail from "../assets/mail.svg";
import Button from "../components/Button";
import errorIcon from "../assets/error.svg";
import { forgotPassword } from "../utils/api";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../schemas/auth.schema";
import { Link, useNavigate } from "react-router";
import ChevronLeft from "../components/ChevronLeft";
import ChevronLeftComp from "../components/ChevronLeft";
import Modal from "../components/SuccessfulModal";
import { routes } from "../utils/constant";
import { CircleAlert } from "lucide-react";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    values: {
      email: "",
    },
  });

  const submitFunc = async (data) => {
    setIsLoading(true);
    try {
      await forgotPassword(data);
      setSuccess(true);
      setError(null);

      navigate(routes.confirmotp, { state: { email: data.email } });
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setError(err.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const errorHandler = (val) => {
    console.log(val);
  };

  return (
    <section className="w-full h-ful max-w-[550px] relative">
      <ChevronLeftComp />
      <div className=" flex flex-col gap-5 w-full items-center">
        {errors.email?.message ? (
          <div className="bg-error-100/10 dark:bg-red-700 flex items-center gap-4 w-full py-1 px-2 rounded-lg">
            <CircleAlert />
            <p className="font-semibold">Your email is incorrect</p>
          </div>
        ) : null}
        <div className="flex flex-col gap-2 items-center">
          <div className="relative">
            <img
              src="/images/logo.svg"
              alt="logo"
              className="p-[12px] m-auto grid w-20 h-24"
            />
          </div>
          <h1 className="heading-3">Forgot Password?</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            No worries, we'll send you reset instructions
          </p>
        </div>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(submitFunc, errorHandler)}
        >
          <TextInput
            {...register("email")}
            leftIcon={<img src={mail} />}
            placeholder="fajar@gma.co"
            className="w-full body-small-medium text-neutral-900"
            errorBorder="border-error-100"
            label="Email"
            error={errors.email?.message}
          />
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            By creating an account, you agree to our Privacy Policy
          </p>
          <Button
            className="w-full mt-3 h-10"
            type="submit"
            isLoading={isLoading}
          >
            {" "}
            Reset Password
          </Button>
        </form>
        <div></div>
      </div>
    </section>
  );
};

export default ForgetPassword;
