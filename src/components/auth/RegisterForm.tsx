"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/features/auth/hooks";
import { type RegisterSchema, registerSchema } from "@/features/auth/schemas";
import { routes } from "@/lib/constants/routes";
import { getErrorMessage } from "@/lib/api/error";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerMutation.mutateAsync(values);
      router.push(routes.feed);
      router.refresh();
    } catch {
      // shown inline
    }
  });

  return (
    <div className="_social_registration_content">
      <div className="_social_registration_right_logo _mar_b28">
        <img src="/assets/images/logo.svg" alt="Buddy Script" className="_right_logo" />
      </div>
      <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
      <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
      <button type="button" className="_social_registration_content_btn _mar_b40">
        <img src="/assets/images/google.svg" alt="Google" className="_google_img" />{" "}
        <span>Register with google</span>
      </button>
      <div className="_social_registration_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>
      <form className="_social_registration_form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">First Name</label>
              <input
                type="text"
                className="form-control _social_registration_input"
                {...register("firstName")}
              />
              {errors.firstName ? <p className="buddy-field-error">{errors.firstName.message}</p> : null}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">Last Name</label>
              <input
                type="text"
                className="form-control _social_registration_input"
                {...register("lastName")}
              />
              {errors.lastName ? <p className="buddy-field-error">{errors.lastName.message}</p> : null}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">Email</label>
              <input
                type="email"
                className="form-control _social_registration_input"
                {...register("email")}
              />
              {errors.email ? <p className="buddy-field-error">{errors.email.message}</p> : null}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">Password</label>
              <input
                type="password"
                className="form-control _social_registration_input"
                {...register("password")}
              />
              {errors.password ? <p className="buddy-field-error">{errors.password.message}</p> : null}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">Repeat Password</label>
              <input
                type="password"
                className="form-control _social_registration_input"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <p className="buddy-field-error">{errors.confirmPassword.message}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
            <div className="form-check _social_registration_form_check">
              <input
                className="form-check-input _social_registration_form_check_input"
                type="radio"
                name="terms"
                id="terms"
                defaultChecked
                readOnly
              />
              <label className="form-check-label _social_registration_form_check_label" htmlFor="terms">
                I agree to terms &amp; conditions
              </label>
            </div>
          </div>
        </div>
        {registerMutation.isError ? (
          <div className="buddy-form-message buddy-form-message_error">
            {getErrorMessage(registerMutation.error, "Unable to create the account right now.")}
          </div>
        ) : null}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_registration_form_btn_link _btn1"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Creating account..." : "Register now"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_registration_bottom_txt">
            <p className="_social_registration_bottom_txt_para">
              Already have an account? <Link href={routes.login}>Login now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
