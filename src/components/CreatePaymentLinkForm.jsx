import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Button from "../components/Button";
import { useModalStore } from "../store/modalStore";
import { createPaymentLinkSchema } from "../schemas/createPayment.schema";
import useLinkStore from "../store/useLinkStore";
import toast from "react-hot-toast";

const CreatePaymentLinkForm = () => {
  const { addLink } = useLinkStore((s) => s);
  const { closeModal } = useModalStore((s) => s);

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
    addLink({
      id: "link7",
      dueName: data.title,
      amount: data.amount,
      link: "nfjndffe",
      status: "Active",
      collected: 0,
      payers: 10,
    });

    closeModal();
    toast.success("Payment Link created succesfully");
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
