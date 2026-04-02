"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, getFeed } from "./api";

export const postQueryKeys = {
  feed: ["posts", "feed"] as const,
};

export function useFeedPosts() {
  return useInfiniteQuery({
    queryKey: postQueryKeys.feed,
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) => getFeed(pageParam),
    getNextPageParam: (lastPage) => (lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : undefined),
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: postQueryKeys.feed,
      });
    },
  });
}
