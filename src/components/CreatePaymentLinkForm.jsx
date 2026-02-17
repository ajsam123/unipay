import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Button from "../components/Button";
import { useModalStore } from "../store/modalStore";
import { createPaymentLinkSchema } from "../schemas/createPayment.schema";
import useLinkStore from "../store/useLinkStore";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createPaymentLink } from "../services/appService";
import { useState } from "react";

const CreatePaymentLinkForm = () => {
  const { closeModal } = useModalStore((s) => s);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createPaymentLinkSchema),
  });

  const createPaymentLinkMutation = useMutation({
    mutationFn: createPaymentLink,
    onSuccess: () => {
      toast.success("Payment link created successfully");
      setIsLoading(false);
      closeModal();
    },
    onError: (error) => {
      console.error("Failed to create link:", error);
      toast.error("Failed to create payment link");
      setIsLoading(false);
    },
  });
  const onSubmit = (data) => {
    setIsLoading(true);
    console.log("FORM DATA:", {
      ...data,
      amount: Number(data.amount),
    });
    createPaymentLinkMutation.mutate({
      title: data.title,
      amount_per_student: Number(data.amount),
      description: data.description || null,
      slug: data.title.toLowerCase().replace(/\s+/g, "-"),
    });
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

      <Button type="submit" className="w-full" isLoading={isLoading}>
        {isLoading ? "Generating..." : "Generate Link"}
      </Button>
    </form>
  );
};

export default CreatePaymentLinkForm;
