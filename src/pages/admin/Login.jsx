import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, Link } from "@tanstack/react-router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import mail from "./../../assets/mail-01.svg";
import { routes } from "../../constants/routes.js";
import { loginschema } from "../../schemas/auth.schema.js";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth.js";
import PasswordInput from "../../components/PasswordInput.jsx";

const Login = () => {
  const router = useRouter(); // use TanStack Router
  const { loginMutation } = useAuth();

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
    loginMutation.mutate(val, {
      onSuccess: () => {
        toast.success("OTP sent to your email");
        router.navigate({
          to: routes.LOGINOTP,
          search: { email: val.email },
        });
      },
      onError: (error) => {
        console.log(error);
        if (error?.response?.data?.code[0] == "EMAIL_NOT_VERIFIED") {
          router.navigate({
            to: routes.VERIFYEMAIL,
            search: { email: val.email },
          });
        }
      },
    });
  };

  const errorHandler = (errors) => {
    console.log(errors);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h1 className="md:heading-3 heading-4">Hi, Welcome</h1>
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
          leftIcon={<img src={mail} alt="mail icon" />}
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

        <Button
          isLoading={loginMutation.isPending}
          type="submit"
          className="body-small-medium"
        >
          Login
        </Button>
      </form>

      <div className="text-center flex flex-col gap-4">
        <Link to={routes.FORGOTPASSWORD}>
          <span>Forgot password?</span>
        </Link>
        <span>
          Don't have an account?{" "}
          <Link className="text-neutral-black-9" to={routes.SIGNUP}>
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
