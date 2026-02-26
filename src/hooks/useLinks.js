// hooks/useLinks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPaymentLinks, createLink } from "../services/appService";

export function useLinks() {
  const queryClient = useQueryClient();

  const { data: links, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: getPaymentLinks,
  });

  const createLinkMutation = useMutation(createLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
    },
  });

  return { links, isLoading, createLinkMutation };
}
