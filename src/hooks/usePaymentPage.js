import { useMutation, useQuery } from "@tanstack/react-query";
import { payment, paymentInfo } from "../services/paymentPageService";
import { handleApiError } from "../utils/getErrorMessage";
import { verifyPayment } from "../services/appService";

export function usePayment() {
  return useMutation({
    mutationFn: payment,
    onError: handleApiError,
  });
}

export function usePaymentInfo(slug) {
  return useQuery({
    queryKey: ["payment-info", slug],
    queryFn: () => paymentInfo({ slug }),
    enabled: !!slug,
  });
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: verifyPayment,
    onError: handleApiError,
  });
}
