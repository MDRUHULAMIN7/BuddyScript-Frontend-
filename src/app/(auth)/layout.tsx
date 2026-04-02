import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants/routes";
import { getServerCurrentUser } from "@/lib/auth/session";

type AuthLayoutProps = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getServerCurrentUser();

  if (user) {
    redirect(routes.feed);
  }

  return <div data-shell="auth">{children}</div>;
}
