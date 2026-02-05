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
import { onboarding } from "../../services/appService.js";
import { useRouter } from "@tanstack/react-router";
const OnboardingOne = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // use TanStack Router

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

  const submitHandler = async (val) => {
    try {
      setIsLoading(true);
      console.log(val);

      await onboarding(val);

      router.navigate({ to: routes.LOGIN });
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Invalid email or password";

      toast.error(message);
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
        <div>
          <IDUpload
            onImageUpload={(file) => {
              setValue("idCardUrl", file, { shouldValidate: true });
            }}
          />

          {errors.schoolId && (
            <p className="text-red-500 text-xs">{errors.schoolId.message}</p>
          )}
        </div>
        <Button isLoading={isLoading}>Next</Button>
      </form>
    </div>
  );
};

export default OnboardingOne;
