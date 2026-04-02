import type { ApiSuccessResponse } from "@/lib/types/api";
import type { CommentItem, CommentPage } from "@/lib/types/common";
import { apiClient } from "@/lib/api/client";

export async function getCommentsByPost(params: {
  postId: string;
  parentCommentId?: string;
  cursor?: string | null;
  limit?: number;
}) {
  const response = await apiClient.get<ApiSuccessResponse<CommentPage>>("/comments", {
    params: {
      postId: params.postId,
      parentCommentId: params.parentCommentId,
      cursor: params.cursor ?? undefined,
      limit: params.limit ?? 5,
    },
  });

  return response.data.data;
}

export async function createComment(payload: {
  postId: string;
  content: string;
  parentCommentId?: string;
}) {
  const response = await apiClient.post<ApiSuccessResponse<CommentItem>>("/comments", payload);
  return response.data.data;
}
