import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";

import Input from "../components/Input";
import Combobox from "../components/ComboBox";
import Button from "../components/Button";

import { bankDetailsSchema } from "../schemas/bankDetails.schema";
import { getBanks, resolveAccount } from "../services/appService";

const BankDetailsForm = () => {
  /* -------------------- Fetch Banks -------------------- */
  const { data: banks = [] } = useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
    staleTime: Infinity,
    select: (data) => {
      if (!Array.isArray(data)) return [];
      return Array.from(new Map(data.map((b) => [b.code, b])).values());
    },
  });

  /* -------------------- Form Setup -------------------- */
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(bankDetailsSchema),
    mode: "onChange",
    defaultValues: {
      bankCode: "",
      accountNumber: "",
    },
  });

  const bankCode = watch("bankCode");
  const accountNumber = watch("accountNumber");

  /* -------------------- Resolve Account Mutation -------------------- */
  const resolveMutation = useMutation({
    mutationFn: resolveAccount,
  });

  /* -------------------- Auto Resolve When Valid -------------------- */
  useEffect(() => {
    if (bankCode && accountNumber?.length === 10) {
      console.log("Attempting resolve:", { bankCode, accountNumber });
      resolveMutation.mutate({
        bank_code: bankCode,
        account_number: accountNumber,
      });
    }
  }, [bankCode, accountNumber]);

  /* -------------------- Derived States -------------------- */
  const isAccountVerified =
    resolveMutation.isSuccess && resolveMutation.data?.account_name;

  const isButtonDisabled =
    !isValid || resolveMutation.isPending || !isAccountVerified || isSubmitting;

  /* -------------------- Submit -------------------- */
  const onSubmit = async (data) => {
    console.log("Final submission:", {
      ...data,
      accountName: resolveMutation.data?.account_name,
    });

    // 👉 Next step: create subaccount here
  };

  /* -------------------- UI -------------------- */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      {/* Bank Combobox */}
      <Controller
        name="bankCode"
        control={control}
        render={({ field }) => (
          <Combobox
            className="w-full"
            label="Bank"
            options={banks}
            value={field.value}
            onChange={field.onChange}
            placeholder="Select your bank"
            error={errors.bankCode?.message}
          />
        )}
      />

      {/* Account Number */}
      <Input
        label="Account Number"
        placeholder="Enter 10-digit account number"
        maxLength={10}
        {...register("accountNumber")}
        error={errors.accountNumber?.message}
      />

      {/* Verification Feedback */}
      {resolveMutation.isPending && (
        <p className="text-sm text-gray-500">Verifying account...</p>
      )}

      {isAccountVerified && (
        <p className="text-sm text-green-600">
          Account Name: {resolveMutation.data.account_name}
        </p>
      )}

      {resolveMutation.isError && (
        <p className="text-sm text-red-500">Failed to verify account</p>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isButtonDisabled}>
        {isSubmitting
          ? "Submitting..."
          : resolveMutation.isPending
            ? "Verifying..."
            : "Continue"}
      </Button>
    </form>
  );
};

export default BankDetailsForm;
