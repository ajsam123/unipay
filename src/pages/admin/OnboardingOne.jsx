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
import { onboardingSchema } from "../../schemas/onboarding.schema.js";
const OnboardingOne = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    values: {
      university: "",
      matricNo: "",
      department: "",
      faculty: "",
      schoolId: "",
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
          {...register("university")}
          leftIcon={<img src={mail} alt="mail icon" />}
          label="University"
          className="w-full border-neutral-black-9"
          placeholder="Your university"
          error={errors.university?.message}
        />

        <Input
          {...register("matricNo")}
          leftIcon={<img src={lock} alt="mail icon" />}
          label="Matric Number"
          className="w-full border-neutral-black-9"
          placeholder="Your matric number"
          error={errors.matricNo?.message}
        />
        <Input
          {...register("faculty")}
          leftIcon={<img src={lock} alt="mail icon" />}
          label="Faculty"
          className="w-full border-neutral-black-9"
          placeholder="Your faculty"
          error={errors.faculty?.message}
        />

        <Input
          {...register("department")}
          leftIcon={<img src={lock} alt="mail icon" />}
          label="Department"
          className="w-full border-neutral-black-9"
          placeholder="Your department"
          error={errors.department?.message}
        />
        <Button isLoading={isLoading}>Next</Button>
      </form>
    </div>
  );
};

export default OnboardingOne;
