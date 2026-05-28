import React from "react";
import Logo from "../../components/Logo";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentPageSchema } from "../../schemas/auth.schema";
import Input from "../../components/Input";
import { Mail, User, UserIcon } from "lucide-react";
import Button from "../../components/Button";
import { usePaymentPage } from "../../hooks/usePaymentPage";
import { useParams } from "@tanstack/react-router";

const PaymentPage = () => {
  const { paymentPageMutation } = usePaymentPage();
  const router = useRouter();
  const { slug } = useParams({ from: "/pay/$slug" });

  const submitHandler = (data) => {
    paymentPageMutation.mutate(
      { slug, data },
      {
        onSuccess: () => {
          router.navigate({
            //   to: routes.VE,
            //   search: { email: data.email },
          });
        },
      },
    );
  };

  const errorHandler = (errors) => {
    console.log("Form Errors:", errors);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentPageSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      matric_number: "",
      email: "",
    },
  });

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">
        <div className="flex flex-col items-center gap-2 mb-6">
          <Logo />

          <h1 className="text-2xl font-bold text-center">
            Payment for Class Due
          </h1>

          <span className="text-gray-600 text-center">
            This is the class payment
          </span>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler, errorHandler)}
          className="flex flex-col gap-4"
        >
          <Input
            label="First Name"
            placeholder="First Name"
            {...register("first_name")}
            className="w-full border-neutral-black-9"
            error={errors.first_name?.message}
            leftIcon={<UserIcon className="text-gray-400" />}
          />

          <Input
            label="Last Name"
            placeholder="Last Name"
            {...register("last_name")}
            className="w-full border-neutral-black-9"
            error={errors.last_name?.message}
            leftIcon={<UserIcon className="text-gray-400" />}
          />

          <Input
            label="Matric Number"
            placeholder="Matric Number"
            {...register("matric_number")}
            className="w-full border-neutral-black-9"
            error={errors.matric_number?.message}
            leftIcon={<UserIcon className="text-gray-400" />}
          />

          <Input
            label="Email"
            placeholder="Email"
            {...register("email")}
            className="w-full border-neutral-black-9"
            error={errors.email?.message}
            leftIcon={<Mail className="text-gray-400" />}
          />

          <Button>Proceed to Payment</Button>
        </form>
      </div>
    </section>
  );
};

export default PaymentPage;
