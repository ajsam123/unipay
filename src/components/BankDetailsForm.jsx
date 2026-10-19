import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Combobox from "../components/ComboBox";
import Button from "../components/Button";
import { bankDetailsSchema } from "../schemas/bankDetails.schema";
import toast from "react-hot-toast";
import { useModalStore } from "../store/modalStore";

import {
  useAddBankDetails,
  useGetBankDetails,
  useGetBanks,
  useResolveAccount,
  useUpdateBankDetails,
} from "../hooks/useBank";

const BankDetailsForm = () => {
  const closeModal = useModalStore((s) => s.closeModal);

  /* -------------------- Queries (run once on mount) -------------------- */

  const { data: banks = [] } = useGetBanks();
  const { data: bankDetails, isLoading: bankDetailsLoading } =
    useGetBankDetails();

  /* -------------------- Mutations -------------------- */

  const { mutate: addBank, isPending: addIsPending } = useAddBankDetails();
  const { mutate: updateBank, isPending: updateIsPending } =
    useUpdateBankDetails();

  const {
    data: resolveData,
    variables: resolvedFor, // the inputs the last verify call was made with
    mutate: resolveMutation,
    isPending: resolveIsPending,
    isSuccess: resolveIsSuccess,
    isError: resolveIsError,
  } = useResolveAccount();

  /* -------------------- Mode -------------------- */

  // Edit mode only when a real saved bank exists. Default is "Add Bank".
  const isEditing = Boolean(
    bankDetails?.bank_code && bankDetails?.account_number,
  );

  /* -------------------- Form -------------------- */

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid },
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

  // In edit mode: has the user changed anything from the saved bank?
  const hasChanged =
    bankCode !== originalBankCode || accountNumber !== originalAccountNumber;

  // Edit mode and nothing changed -> nothing to verify, nothing to save
  const isUnchanged = isEditing && !hasChanged;

  /* -------------------- Prefill when a saved bank exists -------------------- */

  useEffect(() => {
    if (originalBankCode && originalAccountNumber) {
      reset({
        bankCode: originalBankCode,
        accountNumber: originalAccountNumber,
      });
    }
  }, [originalBankCode, originalAccountNumber, reset]);

  /* -------------------- Verify account (the ONLY place it is called) -------------------- */

  const canVerify =
    !bankDetailsLoading &&
    Boolean(bankCode) &&
    /^\d{10}$/.test(accountNumber || "") &&
    !isUnchanged;

  useEffect(() => {
    if (!canVerify) return;

    resolveMutation({
      bank_code: bankCode,
      account_number: accountNumber,
    });
  }, [canVerify, bankCode, accountNumber, resolveMutation]);

  /* -------------------- Derived state -------------------- */

  // Does the last verify result belong to what is currently typed?
  const resultMatchesInputs =
    resolvedFor?.bank_code === bankCode &&
    resolvedFor?.account_number === accountNumber;

  const isAccountVerified =
    resolveIsSuccess && resultMatchesInputs && !!resolveData?.accountName;

  const showVerifyError = resolveIsError && resultMatchesInputs;

  const accountName = isUnchanged
    ? bankDetails?.account_name
    : isAccountVerified
      ? resolveData.accountName
      : null;

  const isSaving = addIsPending || updateIsPending;

  const isButtonDisabled =
    bankDetailsLoading ||
    !isValid ||
    resolveIsPending ||
    !isAccountVerified ||
    isUnchanged ||
    isSaving;

  /* -------------------- Submit (create OR update, never both) -------------------- */

  const onSubmit = (data) => {
    if (!isAccountVerified || isSaving) return;

    if (isEditing) {
      updateBank(
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

    addBank(
      {
        bank_code: data.bankCode,
        account_number: data.accountNumber,
        title: resolveData.accountName,
        percentage_charge: 0,
      },
      {
        onSuccess: () => {
          toast.success("Bank details added successfully");
          closeModal();
        },
        onError: () => {
          toast.error("Failed to add bank details");
        },
      },
    );
  };

  /* -------------------- Button label -------------------- */

  const buttonLabel = resolveIsPending
    ? "Verifying..."
    : isSaving
      ? isEditing
        ? "Updating..."
        : "Adding..."
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
        inputMode="numeric"
        {...register("accountNumber")}
        error={errors.accountNumber?.message}
      />

      {resolveIsPending && (
        <p className="text-sm text-gray-500">Verifying account...</p>
      )}

      {accountName && (
        <p className="body-medium-semibold text-gray-500">{accountName}</p>
      )}

      {showVerifyError && (
        <p className="text-sm text-red-500">
          Failed to verify account. Check the bank and account number.
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isButtonDisabled}>
        {buttonLabel}
      </Button>
    </form>
  );
};

export default BankDetailsForm;
