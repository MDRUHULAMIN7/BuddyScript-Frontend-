"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTargetReactions, likeTarget, unlikeTarget } from "./api";
import { postQueryKeys } from "../posts/hooks";

const reactionKey = (targetType: "comment" | "post", targetId: string) =>
  ["reactions", targetType, targetId] as const;

export function useTargetReactions(targetType: "comment" | "post", targetId: string, enabled = true) {
  return useQuery({
    queryKey: reactionKey(targetType, targetId),
    queryFn: () => getTargetReactions(targetType, targetId),
    enabled,
  });
}

export function useToggleReactionMutation(targetType: "comment" | "post", targetId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (likedByMe: boolean) => {
      return likedByMe ? unlikeTarget(targetType, targetId) : likeTarget(targetType, targetId);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.feed,
        }),
        queryClient.invalidateQueries({
          queryKey: reactionKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: ["comments"],
        }),
      ]);
    },
  });
}
