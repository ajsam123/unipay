import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";

import Input from "../components/Input";
import Combobox from "../components/ComboBox";
import Button from "../components/Button";

import { bankDetailsSchema } from "../schemas/bankDetails.schema";
import {
  getBanks,
  resolveAccount,
  createSubaccount,
} from "../services/appService";
import toast from "react-hot-toast";
import { useModalStore } from "../store/modalStore";

const BankDetailsForm = () => {
  const { closeModal } = useModalStore((s) => s);

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
    mode: "all", // validates on submit + change
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
    onSuccess: (data) => {
      toast.success("Account verified successfully");
    },
    onError: () => {
      toast.error("Failed to verify account");
    },
  });

  /* -------------------- Create Subaccount Mutation -------------------- */
  const createSubaccountMutation = useMutation({
    mutationFn: createSubaccount,
    onSuccess: () => {
      toast.success("Account added successfully");
      closeModal();
    },
    onError: (error) => {
      console.error("Failed to create subaccount:", error);
      toast.error("Failed to add account");
    },
  });

  /* -------------------- Auto Resolve on 10-digit Account -------------------- */
  useEffect(() => {
    if (
      bankCode &&
      accountNumber?.length === 10 &&
      (!resolveMutation.data ||
        resolveMutation.data.account_number !== accountNumber)
    ) {
      resolveMutation.mutate({
        bank_code: bankCode,
        account_number: accountNumber,
      });
    }
  }, [bankCode, accountNumber]);

  /* -------------------- Derived States -------------------- */
  const isAccountVerified =
    resolveMutation.isSuccess && resolveMutation.data?.accountName;

  const isButtonDisabled =
    !isValid ||
    resolveMutation.isPending ||
    (!isAccountVerified && accountNumber?.length < 10) ||
    isSubmitting ||
    createSubaccountMutation.isPending;

  /* -------------------- Handlers -------------------- */
  const handleVerify = () => {
    if (!bankCode || accountNumber?.length !== 10) {
      toast.error("Please select a bank and enter a 10-digit account number");
      return;
    }
    resolveMutation.mutate({
      bank_code: bankCode,
      account_number: accountNumber,
    });
  };

  const onSubmit = (data) => {
    if (!isAccountVerified) return;

    createSubaccountMutation.mutate({
      bank_code: data.bankCode,
      account_number: data.accountNumber,
      title: resolveMutation.data.accountName,
      percentage_charge: 0,
    });
  };

  /* -------------------- Button Label -------------------- */
  const buttonLabel = resolveMutation.isPending
    ? "Verifying..."
    : !isAccountVerified
      ? "Verify"
      : createSubaccountMutation.isPending
        ? "Creating..."
        : "Add Bank";

  /* -------------------- UI -------------------- */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <h1 className='body-medium-semibold'>Bank details</h1>
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
        <p className="body-medium-semibold text-gray-500">
        {resolveMutation.data.accountName}
        </p>
      )}
      {resolveMutation.isError && (
        <p className="text-sm text-red-500">Failed to verify account</p>
      )}

      {/* Submit / Verify Button */}
      <Button
        type={isAccountVerified ? "submit" : "button"}
        onClick={!isAccountVerified ? handleVerify : undefined}
        className="w-full"
        disabled={isButtonDisabled}
      >
        {buttonLabel}
      </Button>
    </form>
  );
};

export default BankDetailsForm;
