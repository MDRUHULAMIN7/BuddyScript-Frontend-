import type { ApiSuccessResponse } from "@/lib/types/api";
import type { User } from "@/lib/types/common";
import { apiClient } from "@/lib/api/client";
import type { LoginInput, RegisterInput } from "./types";

type AuthResponse = ApiSuccessResponse<{
  user: User;
}>;

export async function login(payload: LoginInput) {
  const response = await apiClient.post<AuthResponse>("/auth/login", payload);
  return response.data.data.user;
}

export async function register(payload: RegisterInput) {
  const response = await apiClient.post<AuthResponse>("/auth/register", {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password,
  });

  return response.data.data.user;
}

export async function logout() {
  await apiClient.post("/auth/logout");
}

export async function getCurrentUser() {
  const response = await apiClient.get<ApiSuccessResponse<User>>("/users/me");
  return response.data.data;
}
