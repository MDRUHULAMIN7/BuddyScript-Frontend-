"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/features/auth/hooks";
import { type LoginSchema, loginSchema } from "@/features/auth/schemas";
import { routes } from "@/lib/constants/routes";
import { getErrorMessage } from "@/lib/api/error";

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync(values);
      router.push(routes.feed);
      router.refresh();
    } catch {
      // handled in UI
    }
  });

  return (
    <div className="_social_login_content">
      <div className="_social_login_left_logo _mar_b28">
        <img src="/assets/images/logo.svg" alt="Buddy Script" className="_left_logo" />
      </div>
      <p className="_social_login_content_para _mar_b8">Welcome back</p>
      <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
      <button type="button" className="_social_login_content_btn _mar_b40">
        <img src="/assets/images/google.svg" alt="Google" className="_google_img" />{" "}
        <span>Or sign-in with google</span>
      </button>
      <div className="_social_login_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>
      <form className="_social_login_form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Email</label>
              <input type="email" className="form-control _social_login_input" {...register("email")} />
              {errors.email ? <p className="buddy-field-error">{errors.email.message}</p> : null}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Password</label>
              <input
                type="password"
                className="form-control _social_login_input"
                {...register("password")}
              />
              {errors.password ? <p className="buddy-field-error">{errors.password.message}</p> : null}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="form-check _social_login_form_check">
              <input
                className="form-check-input _social_login_form_check_input"
                type="radio"
                name="remember"
                id="rememberMe"
                defaultChecked
                readOnly
              />
              <label className="form-check-label _social_login_form_check_label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="_social_login_form_left">
              <p className="_social_login_form_left_para">Forgot password?</p>
            </div>
          </div>
        </div>
        {loginMutation.isError ? (
          <div className="buddy-form-message buddy-form-message_error">
            {getErrorMessage(loginMutation.error, "Unable to sign in right now.")}
          </div>
        ) : null}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_login_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_login_form_btn_link _btn1"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login now"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_bottom_txt">
            <p className="_social_login_bottom_txt_para">
              Dont have an account? <Link href={routes.register}>Create New Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
