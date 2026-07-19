import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Input from "../components/Input";
import Combobox from "../components/ComboBox";
import Button from "../components/Button";
import { bankDetailsSchema } from "../schemas/bankDetails.schema";
import { resolveAccount, createSubaccount } from "../services/appService";
import toast from "react-hot-toast";
import { useModalStore } from "../store/modalStore";

import {
  useGetBankDetails,
  useGetBanks,
  useUpdateBankDetails,
} from "../hooks/useBank";

const BankDetailsForm = () => {
  const { closeModal } = useModalStore((s) => s);

  const { data: banks = [] } = useGetBanks();

  const { data: bankDetails } = useGetBankDetails();

  const updateBankDetailsMutation = useUpdateBankDetails();

  const isEditing = !bankDetails;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(bankDetailsSchema),
    mode: "all",
    defaultValues: {
      bankCode: "",
      accountNumber: "",
    },
  });

  const bankCode = watch("bankCode");
  const accountNumber = watch("accountNumber");

  const originalBankCode = bankDetails?.bank_code;
  const originalAccountNumber = bankDetails?.account_number;

  const hasChanged =
    bankCode !== originalBankCode || accountNumber !== originalAccountNumber;

  /* -------------------- Populate Existing Values -------------------- */

  useEffect(() => {
    if (bankDetails) {
      reset({
        bankCode: bankDetails.bank_code,
        accountNumber: bankDetails.account_number,
      });
    }
  }, [bankDetails, reset]);

  /* -------------------- Resolve Account -------------------- */

  const resolveMutation = useMutation({
    mutationFn: resolveAccount,
    onSuccess: () => {
      toast.success("Account verified successfully");
    },
    onError: () => {
      toast.error("Failed to verify account");
    },
  });

  /* -------------------- Create Subaccount -------------------- */

  const createSubaccountMutation = useMutation({
    mutationFn: createSubaccount,
    onSuccess: () => {
      toast.success("Bank account added successfully");
      QueryClient.invalidateQueries({
        queryKey: ["bank-details"],
      });
      closeModal();
    },
    onError: () => {
      toast.error("Failed to add bank account");
    },
  });

  /* -------------------- Auto Verify -------------------- */

  useEffect(() => {
    const shouldVerify =
      bankCode && accountNumber?.length === 10 && (!isEditing || hasChanged);

    if (!shouldVerify) return;

    resolveMutation.mutate({
      bank_code: bankCode,
      account_number: accountNumber,
    });
  }, [bankCode, accountNumber, hasChanged]);

  /* -------------------- Derived States -------------------- */

  const isAccountVerified =
    isEditing && !hasChanged ? true : !!resolveMutation.data?.accountName;

  const accountName = hasChanged
    ? resolveMutation.data?.accountName
    : bankDetails?.account_name;

  const isSaving =
    createSubaccountMutation.isPending || updateBankDetailsMutation.isPending;

  const isButtonDisabled =
    !isValid ||
    resolveMutation.isPending ||
    (!isAccountVerified && accountNumber?.length < 10) ||
    isSubmitting ||
    isSaving;

  /* -------------------- Verify Handler -------------------- */

  const handleVerify = () => {
    if (!bankCode || accountNumber?.length !== 10) {
      toast.error(
        "Please select a bank and enter a valid 10-digit account number",
      );
      return;
    }

    resolveMutation.mutate({
      bank_code: bankCode,
      account_number: accountNumber,
    });
  };

  /* -------------------- Submit -------------------- */

  const onSubmit = (data) => {
    if (!isAccountVerified) return;

    if (isEditing) {
      updateBankDetailsMutation.mutate(
        {
          bank_code: data.bankCode,
          account_number: data.accountNumber,
        },
        {
          onSuccess: () => {
            toast.success("Bank details updated successfully");
            closeModal();
          },
          onError: () => {
            toast.error("Failed to update bank details");
          },
        },
      );

      return;
    }

    createSubaccountMutation.mutate({
      bank_code: data.bankCode,
      account_number: data.accountNumber,
      title: resolveMutation.data?.accountName,
      percentage_charge: 0,
    });
  };

  /* -------------------- Button Label -------------------- */

  const buttonLabel = resolveMutation.isPending
    ? "Verifying..."
    : !isAccountVerified
      ? "Verify"
      : isSaving
        ? isEditing
          ? "Updating..."
          : "Creating..."
        : isEditing
          ? "Update Bank"
          : "Add Bank";

  /* -------------------- UI -------------------- */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <h1 className="body-medium-semibold">
        {isEditing ? "Edit Bank Details" : "Bank Details"}
      </h1>

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

      <Input
        label="Account Number"
        placeholder="Enter 10-digit account number"
        maxLength={10}
        {...register("accountNumber")}
        error={errors.accountNumber?.message}
      />

      {resolveMutation.isPending && (
        <p className="text-sm text-gray-500">Verifying account...</p>
      )}

      {accountName && (
        <p className="body-medium-semibold text-gray-500">{accountName}</p>
      )}

      {resolveMutation.isError && (
        <p className="text-sm text-red-500">Failed to verify account</p>
      )}

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
