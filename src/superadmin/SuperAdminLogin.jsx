import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginschema } from "../schemas/auth.schema";
import toast from "react-hot-toast";
import { routes } from "../constants/routes";
import { Mail } from "lucide-react";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAdminLogin } from "../hooks/useSuperAdmin";

const SuperAdminLogin = () => {
  const router = useRouter(); // use TanStack Router
  const { mutate, isPending, data } = useAdminLogin();

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

  const submitHandler = (val) => {
    mutate(val, {
      onSuccess: () => {
        toast.success("OTP sent to your email");
        router.navigate({
          to: routes.SUPERADMINDASHBOARD,
        });
      },
    });
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
          leftIcon={<Mail />}
          label="Email"
          className="w-full border-neutral-black-9"
          placeholder="Your email"
          error={errors.email?.message}
        />

        <PasswordInput
          {...register("password")}
          label="Password"
          placeholder="Your password"
          error={errors.password?.message}
        />

        <Button isLoading={isPending} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default SuperAdminLogin;
