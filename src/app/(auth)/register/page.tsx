import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      illustration="/assets/images/registration.png"
      illustrationDark="/assets/images/registration1.png"
      mediaAlign="right"
    >
      <RegisterForm />
    </AuthShell>
  );
}
