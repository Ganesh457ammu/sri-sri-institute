import { createActor } from "@/backend";
import type { Enquiry } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEnquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Enquiry[]>({
    queryKey: ["enquiries"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getEnquiries();
      return result.map((e) => ({
        id: Number(e.id),
        name: e.name,
        phone: e.phone,
        email: e.email,
        course: e.course,
        city: e.city,
        message: e.message,
        timestamp: e.timestamp,
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useEnquiryCount() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<number>({
    queryKey: ["enquiry-count"],
    queryFn: async () => {
      if (!actor) return 0;
      const count = await actor.getEnquiryCount();
      return Number(count);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitEnquiry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      course: string;
      city: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.submitEnquiry(
        data.name,
        data.phone,
        data.email,
        data.course,
        data.city,
        data.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["enquiry-count"] });
    },
  });
}
