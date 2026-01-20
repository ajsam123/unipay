import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import mail from "./../../assets/mail-01.svg";
import chevron from "./../../assets/chevron-left.svg";
import { Link, useNavigate } from "react-router";
import { routes } from "../../constants/routes";
import { forgotPasswordSchema } from "../../schemas/auth.schema";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { forgotPassword } from "../../services/authService";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      setError(null);
      toast.success("OTP sent to Email");
      navigate(routes.CONFIRMOTP, { state: { email: data.email } });
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const errorHandler = (val) => {
    console.log(val);
  };

  return (
    <section className="w-full h-full relative">
      <Link to={routes.LOGIN}>
        {" "}
        <figure className="grid place-items-center border w-16 h-10 rounded-full">
          <img src={chevron} />
        </figure>
      </Link>
      <div className=" flex flex-col gap-5 w-full items-center">
        {errors.email?.message ? (
          <div className="bg-error-100/10 dark:bg-red-700 flex items-center gap-4 w-full py-1 px-2 rounded-lg">
            {/* <CircleAlert /> */}
            <p className="font-semibold">Your email is incorrect</p>
          </div>
        ) : null}
        <div className="flex flex-col gap-2 items-center">
          <h1 className="heading-3">Forgot Password?</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            No worries, we'll send you reset instructions
          </p>
        </div>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(submitFunc, errorHandler)}
        >
          <Input
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
      </div>
    </section>
  );
};

export default ForgotPassword;
