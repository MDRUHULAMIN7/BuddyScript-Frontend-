import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      wrapperClassName="_social_login_wrapper _layout_main_wrapper"
      contentClassName="_social_login_wrap"
      mediaContainerClassName="_social_login_left"
      mediaClassName="_social_login_left_image"
      illustration="/assets/images/login.png"
    >
      <LoginForm />
    </AuthShell>
  );
}
