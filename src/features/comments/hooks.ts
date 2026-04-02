"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, getCommentsByPost } from "./api";
import { postQueryKeys } from "../posts/hooks";

const commentKey = (postId: string, parentCommentId?: string) =>
  ["comments", postId, parentCommentId ?? "root"] as const;

export function useComments(params: {
  postId: string;
  parentCommentId?: string;
  enabled?: boolean;
}) {
  return useInfiniteQuery({
    queryKey: commentKey(params.postId, params.parentCommentId),
    initialPageParam: null as string | null,
    enabled: params.enabled ?? true,
    queryFn: ({ pageParam }) =>
      getCommentsByPost({
        postId: params.postId,
        parentCommentId: params.parentCommentId,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => (lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : undefined),
  });
}

export function useCreateCommentMutation(postId: string, parentCommentId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: commentKey(postId, parentCommentId),
        }),
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.feed,
        }),
      ]);
    },
  });
}
