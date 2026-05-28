import { useMutation } from "@tanstack/react-query";
import { payment } from "../services/paymentPageService";
import { handleApiError } from "../utils/getErrorMessage";

export function usePaymentPage() {
  const paymentPageMutation = useMutation({
    mutationFn: payment,
    onError: (error) => {
      handleApiError(error);
    },
  });
  return paymentPageMutation;
}
