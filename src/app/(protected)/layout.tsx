import type { ReactNode } from "react";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <div data-shell="protected">{children}</div>;
}
