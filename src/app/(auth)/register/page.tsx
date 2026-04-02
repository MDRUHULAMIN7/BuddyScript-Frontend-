import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      wrapperClassName="_social_registration_wrapper _layout_main_wrapper"
      contentClassName="_social_registration_wrap"
      mediaContainerClassName="_social_registration_right"
      mediaClassName="_social_registration_right_image"
      mediaDarkContainerClassName="_social_registration_right_image_dark"
      mediaDarkClassName=""
      illustration="/assets/images/registration.png"
      illustrationDark="/assets/images/registration1.png"
    >
      <RegisterForm />
    </AuthShell>
  );
}
