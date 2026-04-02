import type { ApiSuccessResponse } from "@/lib/types/api";
import type { ReactionPage } from "@/lib/types/common";
import { apiClient } from "@/lib/api/client";

export async function likeTarget(targetType: "comment" | "post", targetId: string) {
  const response = await apiClient.put<ApiSuccessResponse<{ changed: boolean; liked: boolean }>>(
    `/reactions/${targetType}/${targetId}`,
  );
  return response.data.data;
}

export async function unlikeTarget(targetType: "comment" | "post", targetId: string) {
  const response = await apiClient.delete<ApiSuccessResponse<{ changed: boolean; liked: boolean }>>(
    `/reactions/${targetType}/${targetId}`,
  );
  return response.data.data;
}

export async function getTargetReactions(targetType: "comment" | "post", targetId: string) {
  const response = await apiClient.get<ApiSuccessResponse<ReactionPage>>(
    `/reactions/${targetType}/${targetId}`,
    {
      params: {
        limit: 30,
      },
    },
  );

  return response.data.data;
}
