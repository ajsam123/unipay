import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import mail from "./../../assets/mail-01.svg";
import lock from "./../../assets/lock-03.svg";
import Button from "../../components/Button";
import { Link } from "react-router";
import { onboardingSchema } from "../../schemas/onboarding.schema.js";
const OnboardingTwo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    values: {
      bankName: "",
      accountNumber: "",
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
          Onboarding
        </span>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler, errorHandler)}
        className="flex flex-col gap-4 w-full"
      >
        <div></div>
        <Input
          {...register("bankName")}
          leftIcon={<img src={mail} alt="mail icon" />}
          label="Bank name"
          className="w-full border-neutral-black-9"
          placeholder="Your bank name"
          error={errors.bankName?.message}
        />

        <Input
          {...register("accountNumber")}
          leftIcon={<img src={lock} alt="mail icon" />}
          label="Account number"
          className="w-full border-neutral-black-9"
          placeholder="Your account number"
          error={errors.accountNumber?.message}
        />
        <Input
          disabled
          leftIcon={<img src={lock} alt="mail icon" />}
          label="Account holder name"
          className="w-full border-neutral-black-9"
          placeholder="Account holder name"
        />
        <Button isLoading={isLoading}>Submit</Button>
      </form>
    </div>
  );
};

export default OnboardingTwo;
