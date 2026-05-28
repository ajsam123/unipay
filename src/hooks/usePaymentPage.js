import { useMutation, useQuery } from "@tanstack/react-query";
import { payment, paymentInfo } from "../services/paymentPageService";
import { handleApiError } from "../utils/getErrorMessage";

export function usePaymentPage(slug) {
  const paymentPageMutation = useMutation({
    mutationFn: payment,
    onError: handleApiError,
  });

  const paymentInfoQuery = useQuery({
    queryKey: ["payment-info", slug],
    queryFn: () => paymentInfo({ slug }),
    enabled: !!slug,
  });

  return {
    paymentPageMutation,
    paymentInfoQuery,
  };
}
