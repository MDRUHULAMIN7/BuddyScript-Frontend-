import type { ReactNode } from "react";
import { requireServerUser } from "@/lib/auth/session";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  await requireServerUser();
  return <div data-shell="protected">{children}</div>;
}
