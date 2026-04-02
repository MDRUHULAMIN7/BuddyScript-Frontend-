import type { ApiSuccessResponse } from "@/lib/types/api";
import type { FeedPage, FeedPost } from "@/lib/types/common";
import { apiClient } from "@/lib/api/client";

export async function getFeed(cursor?: string | null, limit = 4) {
  const response = await apiClient.get<ApiSuccessResponse<FeedPage>>("/posts", {
    params: {
      limit,
      cursor: cursor ?? undefined,
    },
  });

  return response.data.data;
}

export async function createPost(formData: FormData) {
  const response = await apiClient.post<ApiSuccessResponse<FeedPost>>("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
}
