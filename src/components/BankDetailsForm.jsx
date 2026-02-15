import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Combobox from "../components/ComboBox";
import Button from "../components/Button";
import { bankDetailsSchema } from "../schemas/bankDetails.schema";
import { useQuery } from "@tanstack/react-query";
import { getBanks } from "../services/appService";

const BankDetailsForm = () => {
  const {
    data: banks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      bankCode: "",
      accountNumber: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("BANK DETAILS:", data);

    // Later:
    // 1. Call resolve-account endpoint
    // 2. Show verified account name
    // 3. Create subaccount
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Bank Combobox */}
      <Controller
        name="bankCode"
        control={control}
        render={({ field }) => (
          <Combobox
            label="Bank"
            options={banks}
            value={field.value}
            onChange={field.onChange}
            placeholder={
              isLoading
                ? "Loading banks..."
                : isError
                  ? "Failed to load banks"
                  : "Select your bank"
            }
            error={errors.bankCode?.message}
          />
        )}
      />

      {/* Account Number */}
      <Input
        label="Account Number"
        placeholder="Enter 10-digit account number"
        {...register("accountNumber")}
        error={errors.accountNumber?.message}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Verifying..." : "Verify Account"}
      </Button>
    </form>
  );
};

export default BankDetailsForm;
