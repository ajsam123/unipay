import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../services/appService";
import { handleApiError } from "../utils/getErrorMessage";

export function useGetDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    onError: handleApiError,
    refetchOnWindowFocus: false,
  });
}
