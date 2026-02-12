import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Button from "../components/Button";
import { useModalStore } from "../store/modalStore";
import { createPaymentLinkSchema } from "../schemas/createPayment.schema";

const CreatePaymentLinkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createPaymentLinkSchema),
  });

  const onSubmit = (data) => {
    console.log("FORM DATA:", {
      ...data,
      amount: Number(data.amount),
    });

    // later: API call here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label="Due Title"
        placeholder="e.g. Second Semester Tuition"
        {...register("title")}
        error={errors.title?.message}
      />

      <Input
        label="Amount (₦)"
        placeholder="50000"
        {...register("amount")}
        error={errors.amount?.message}
      />

      <Input
        label="Description (Optional)"
        placeholder="Add details about this payment..."
        {...register("description")}
        error={errors.description?.message}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Generating..." : "Generate Link"}
      </Button>
    </form>
  );
};

export default CreatePaymentLinkForm;
