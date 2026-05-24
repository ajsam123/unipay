import Input from "../../components/Input";
import mail from "./../../assets/mail-01.svg";
import Button from "../../components/Button";
import { routes } from "./../../constants/routes.js";
import { Link, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/auth.schema.js";
import { useAuth } from "../../hooks/useAuth.js";
import PasswordInput from "../../components/PasswordInput.jsx";
import { PhoneCallIcon, User, User2Icon } from "lucide-react";

const Signup = () => {
  const router = useRouter();
  const { signUpMutation } = useAuth();

  const submitHandler = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        router.navigate({
          to: routes.VERIFYEMAIL,
          search: { email: data.email },
        });
      },
    });
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
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h1 className="heading-3">Create your account</h1>
        <span className="text-neutral-black-9 dark:text-neutral-400 body-medium-medium">
          Please fill in your details to create an account
        </span>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler, errorHandler)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex items-center gap-4">
          <Input
            {...register("first_name")}
            label="First Name"
            className="w-full border-neutral-black-9"
            placeholder="Input your first name"
            leftIcon={<User2Icon className="text-neutral-black-9"/>}
            error={errors.first_name?.message}
          />

          <Input
            {...register("last_name")}
            label="Last Name"
            className="w-full border-neutral-black-9"
            placeholder="Input your last name"
            leftIcon={<User2Icon className="text-neutral-black-9"/>}
            error={errors.last_name?.message}
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
          {...register("phone_number")}
          leftIcon={<PhoneCallIcon className="text-neutral-black-9"/>}
          label="Phone number"
          className="w-full border-neutral-black-9"
          placeholder="Your phone number"
          error={errors.phone_number?.message}
        />

        <PasswordInput
          {...register("password")}
          label="Password"
          placeholder="Your password"
          error={errors.password?.message}
        />

        <PasswordInput
          {...register("confirm_password")}
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirm_password?.message}
        />

        <Button isLoading={signUpMutation.isPending}>Sign up</Button>
      </form>

      <div className="text-center flex flex-col gap-4">
        <span>
          Already have an account?{" "}
          <Link className="text-neutral-black-9" to={routes.LOGIN}>
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
