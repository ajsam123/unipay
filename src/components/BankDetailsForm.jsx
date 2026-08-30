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
  // Close Modal
  const { closeModal } = useModalStore((s) => s);

  // Get all banks
  const { data: banks = [] } = useGetBanks();

  // Get user Bank Details
  const { data: bankDetails } = useGetBankDetails();

  // Add bank details/ Create Subaccount Mutation
  const {
    mutate: createSubaccountMutation,
    isPending: createSubaccountIsPending,
  } = useAddBankDetails();

  // Resoleve account with bank code and account number mutation

  const {
    data: resolveAccountData,
    mutate: resolveMutation,
    isPending: resolveIsPending,
    isError: resolveError,
  } = useResolveAccount();

  // Edit/update bank mutation
  const { mutate: updateBankDetailsMutation } = useUpdateBankDetails();

  const isEditing = !!bankDetails;

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

  //  Original current bank details
  const originalBankCode = bankDetails?.bank_code;
  const originalAccountNumber = bankDetails?.account_number;

  // Checks whether current bank code or account number is different from initial
  const hasChanged =
    bankCode !== originalBankCode || accountNumber !== originalAccountNumber;

  /* -------------------- Populate Existing Bank details to input -------------------- */

  useEffect(() => {
    if (bankDetails) {
      reset({
        bankCode: bankDetails.bank_code,
        accountNumber: bankDetails.account_number,
      });
    }
  }, [bankDetails, reset]);

  /* -------------------- Auto Verify -------------------- */

  useEffect(() => {
    const shouldVerify =
      bankCode && accountNumber?.length === 10 && (!isEditing || hasChanged);

    if (!shouldVerify) return;

    resolveMutation({
      bank_code: bankCode,
      account_number: accountNumber,
    });
  }, [bankCode, accountNumber, hasChanged]);

  /* -------------------- Derived States -------------------- */

  const isAccountVerified =
    isEditing && !hasChanged ? true : !!resolveAccountData?.accountName;

  const accountName = hasChanged
    ? resolveAccountData?.accountName
    : bankDetails?.account_name;

  const isSaving =
    createSubaccountIsPending || updateBankDetailsMutation.isPending;

  const isButtonDisabled =
    !isValid ||
    resolveIsPending ||
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
    if (!hasChanged) return;

    resolveMutation({
      bank_code: bankCode,
      account_number: accountNumber,
    });
  };

  /* -------------------- Submit -------------------- */

  const onSubmit = (data) => {
    if (!isAccountVerified) return;

    if (isEditing) {
      updateBankDetailsMutation(
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

    createSubaccountMutation({
      bank_code: data.bankCode,
      account_number: data.accountNumber,
      title: resolveAccountData?.accountName,
      percentage_charge: 0,
    });
  };

  /* -------------------- Button Label -------------------- */

  const buttonLabel = resolveIsPending
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

  // Whether to show verify account error or not
  const showVerifyerror =
    resolveError && hasChanged && !resolveAccountData?.accountName;

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

      {resolveIsPending && (
        <p className="text-sm text-gray-500">Verifying account...</p>
      )}

      {accountName && (
        <p className="body-medium-semibold text-gray-500">{accountName}</p>
      )}

      {showVerifyerror && (
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
