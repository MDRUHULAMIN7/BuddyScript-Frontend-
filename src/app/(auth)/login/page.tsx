import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell illustration="/assets/images/login.png" mediaAlign="left">
      <LoginForm />
    </AuthShell>
  );
}
