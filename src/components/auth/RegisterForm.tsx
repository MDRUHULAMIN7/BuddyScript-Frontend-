"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/features/auth/hooks";
import { getErrorMessage } from "@/lib/api/error";
import { routes } from "@/lib/constants/routes";
import { type RegisterSchema, registerSchema } from "@/features/auth/schemas";

const inputClassName =
  "h-14 w-full rounded-[16px] border border-black/10 bg-white px-4 text-[15px] text-[#112032] outline-none transition placeholder:text-black/30 focus:border-[#1890ff] focus:ring-4 focus:ring-[#1890ff]/10";

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
    <div>
      <div className="mb-7">
        <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-9 w-auto" />
      </div>
      <p className="mb-2 text-sm font-medium text-black/50">Get Started Now</p>
      <h1 className="mb-12 text-[34px] font-semibold leading-[1.14] tracking-[-0.02em] text-[#112032] sm:text-[40px]">
        Registration
      </h1>

      <button
        type="button"
        className="mb-10 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white px-4 text-[15px] font-medium text-[#112032] shadow-[0_14px_34px_rgba(17,32,50,0.06)] transition hover:border-[#1890ff]/30 hover:shadow-[0_18px_42px_rgba(17,32,50,0.09)]"
      >
        <img src="/assets/images/google.svg" alt="Google" className="h-5 w-5" />
        <span>Register with google</span>
      </button>

      <div className="mb-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-black/10" />
        <span className="text-sm font-medium text-black/45">Or</span>
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#112032]">First Name</label>
            <input type="text" className={inputClassName} {...register("firstName")} />
            {errors.firstName ? <p className="buddy-field-error">{errors.firstName.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#112032]">Last Name</label>
            <input type="text" className={inputClassName} {...register("lastName")} />
            {errors.lastName ? <p className="buddy-field-error">{errors.lastName.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#112032]">Email</label>
            <input type="email" className={inputClassName} {...register("email")} />
            {errors.email ? <p className="buddy-field-error">{errors.email.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#112032]">Password</label>
            <input type="password" className={inputClassName} {...register("password")} />
            {errors.password ? <p className="buddy-field-error">{errors.password.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#112032]">Repeat Password</label>
            <input type="password" className={inputClassName} {...register("confirmPassword")} />
            {errors.confirmPassword ? <p className="buddy-field-error">{errors.confirmPassword.message}</p> : null}
          </div>
        </div>

        <label className="inline-flex items-center gap-2 text-[#112032]">
          <input
            type="radio"
            name="terms"
            defaultChecked
            readOnly
            className="h-4 w-4 border border-[#1890ff] text-[#1890ff] accent-[#1890ff]"
          />
          <span className="text-sm font-medium text-black/70">I agree to terms &amp; conditions</span>
        </label>

        {registerMutation.isError ? (
          <div className="buddy-form-message buddy-form-message_error">
            {getErrorMessage(registerMutation.error, "Unable to create the account right now.")}
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[#1890ff] px-5 text-[15px] font-semibold text-white shadow-[0_18px_40px_rgba(24,144,255,0.28)] transition hover:bg-[#0d7de8] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Creating account..." : "Register now"}
        </button>
      </form>

      <div className="mt-10 border-t border-black/8 pt-6">
        <p className="text-sm text-black/55">
          Already have an account?{" "}
          <Link href={routes.login} className="font-semibold text-[#1890ff] transition hover:text-[#0d7de8]">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}
