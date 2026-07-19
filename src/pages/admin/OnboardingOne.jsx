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
import IDUpload from "../../components/SchoolIdUpload.jsx";
import toast from "react-hot-toast";
import { useRouter } from "@tanstack/react-router";
import { useOnboardingUser, useUsers } from "../../hooks/useUsers.js";
const OnboardingOne = () => {
  const router = useRouter(); // use TanStack Router
  const { data: user } = useUsers();
  const { mutate: onboardUser, isPending } = useOnboardingUser();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    values: {
      university: "",
      matricNo: "",
      department: "",
      faculty: "",
      idCardUrl: null,
    },
  });

  const submitHandler = (val) => {
    onboardUser(val, {
      onSuccess: () => {
        toast.success("Onboarding Successful");
        router.navigate({
          to: routes.DASHBOARD,
        });
      },
    });
  };

  const errorHandler = (val) => {
    console.log(val);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h1 className="heading-4 md:heading-3">Hi, {user?.first_name} </h1>
        <span className="text-neutral-black-9 dark:text-neutral-400 body-medium-medium">
          Let's complete your onboarding.
        </span>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler, errorHandler)}
        className="flex flex-col gap-3 md:gap-4 w-full"
      >
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
        <div>
          <IDUpload
            onImageUpload={(file) => {
              setValue("idCardUrl", file, { shouldValidate: true });
            }}
          />

          {errors.idCardUrl && (
            <p className="text-red-500 text-xs">{errors.idCardUrl.message}</p>
          )}
        </div>
        <Button isLoading={isPending}>Next</Button>
      </form>
    </div>
  );
};

export default OnboardingOne;
