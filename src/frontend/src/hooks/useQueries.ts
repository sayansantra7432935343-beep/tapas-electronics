import { useQuery } from "@tanstack/react-query";
import type { BusinessInfo, Product } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBusinessInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<BusinessInfo>({
    queryKey: ["businessInfo"],
    queryFn: async () => {
      if (!actor) {
        return { name: "", tagline: "", contactNumbers: [] };
      }
      return actor.getBusinessInfo();
    },
    enabled: !!actor && !isFetching,
  });
}
