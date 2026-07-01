import React from "react";
import Logo from "../../components/Logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentPageSchema } from "../../schemas/auth.schema";
import Input from "../../components/Input";
import { Mail, UserIcon } from "lucide-react";
import Button from "../../components/Button";
import { usePayment, usePaymentInfo } from "../../hooks/usePaymentPage";
import { useParams } from "@tanstack/react-router";

const PaymentPage = () => {
  const { slug } = useParams({ from: "/pay/$slug" });

  const { mutate: paymentMutate, isPending } = usePayment();

  const { data: paymentInfo, isPending: loading } = usePaymentInfo(slug);

  const amountFormatter = (amount) => {
    if (amount == null) return "";

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const amount = amountFormatter(paymentInfo?.amount_per_student);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentPageSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      matric_no: "",
      email: "",
    },
  });

  const submitHandler = (data) => {
    paymentMutate(
      { slug, data },
      {
        onSuccess: (res) => {
          window.location.href = res.authorization_url;
        },
      },
    );
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        {/* ================= PAYMENT INFO CARD ================= */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl p-6">
          <div className="flex flex-col items-center text-center">
            <Logo />

            {/* TITLE */}
            {loading ? (
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
            ) : (
              <h1 className="mt-2 text-xl font-semibold text-gray-900">
                {paymentInfo?.title}
              </h1>
            )}

            {/* DESCRIPTION */}
            {loading ? (
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mt-3"></div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                {paymentInfo?.description}
              </p>
            )}

            {/* ================= AMOUNT BOX ================= */}
            <div className="mt-6 w-full rounded-xl border border-white/30 bg-white/40 backdrop-blur-xl p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Amount
              </p>

              {loading ? (
                <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse mt-3 mx-auto"></div>
              ) : (
                <h2 className="text-3xl font-bold text-gray-900 mt-2 text-center">
                  {amount}
                </h2>
              )}

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                Secure Payment
              </div>
            </div>
          </div>
        </div>

        {/* ================= FORM CARD ================= */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Details
          </h2>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <Input
              label="First Name"
              placeholder="First Name"
              {...register("first_name")}
              error={errors.first_name?.message}
              leftIcon={<UserIcon className="text-gray-400" />}
            />

            <Input
              label="Last Name"
              placeholder="Last Name"
              {...register("last_name")}
              error={errors.last_name?.message}
              leftIcon={<UserIcon className="text-gray-400" />}
            />

            <Input
              label="Matric Number"
              placeholder="Matric Number"
              {...register("matric_no")}
              error={errors.matric_no?.message}
              leftIcon={<UserIcon className="text-gray-400" />}
            />

            <Input
              label="Email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
              leftIcon={<Mail className="text-gray-400" />}
            />

            <Button isLoading={isPending} className="w-full mt-2">
              Proceed to Payment
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
