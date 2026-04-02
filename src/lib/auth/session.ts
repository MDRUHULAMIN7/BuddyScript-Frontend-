import { redirect } from "next/navigation";
import { routes } from "../constants/routes";
import type { ApiSuccessResponse } from "../types/api";
import type { User } from "../types/common";
import { serverGet } from "../api/server";

export async function getServerCurrentUser() {
  const response = await serverGet<ApiSuccessResponse<User>>("/users/me");
  return response?.data ?? null;
}

export async function requireServerUser() {
  const user = await getServerCurrentUser();

  if (!user) {
    redirect(routes.login);
  }

  return user;
}
