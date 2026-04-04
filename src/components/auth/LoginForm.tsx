"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/features/auth/hooks";
import { getErrorMessage } from "@/lib/api/error";
import { routes } from "@/lib/constants/routes";
import { type LoginSchema, loginSchema } from "@/features/auth/schemas";

const inputClassName =
  "h-14 w-full rounded-[16px] border border-black/10 bg-white px-4 text-[15px] text-[#112032] outline-none transition placeholder:text-black/30 focus:border-[#1890ff] focus:ring-4 focus:ring-[#1890ff]/10";

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
    <div>
      <div className="mb-7">
        <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-9 w-auto" />
      </div>
      <p className="mb-2 text-sm font-medium text-black/50">Welcome back</p>
      <h1 className="mb-12 text-[34px] font-semibold leading-[1.14] tracking-[-0.02em] text-[#112032] sm:text-[40px]">
        Login to your account
      </h1>

      <button
        type="button"
        className="mb-10 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white px-4 text-[15px] font-medium text-[#112032] shadow-[0_14px_34px_rgba(17,32,50,0.06)] transition hover:border-[#1890ff]/30 hover:shadow-[0_18px_42px_rgba(17,32,50,0.09)]"
      >
        <img src="/assets/images/google.svg" alt="Google" className="h-5 w-5" />
        <span>Or sign-in with google</span>
      </button>

      <div className="mb-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-black/10" />
        <span className="text-sm font-medium text-black/45">Or</span>
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-4">
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
        </div>

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex items-center gap-2 text-[#112032]">
            <input
              type="radio"
              name="remember"
              defaultChecked
              readOnly
              className="h-4 w-4 border border-[#1890ff] text-[#1890ff] accent-[#1890ff]"
            />
            <span className="font-medium text-black/70">Remember me</span>
          </label>
          <p className="text-sm font-medium text-black/45">Forgot password?</p>
        </div>

        {loginMutation.isError ? (
          <div className="buddy-form-message buddy-form-message_error">
            {getErrorMessage(loginMutation.error, "Unable to sign in right now.")}
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[#1890ff] px-5 text-[15px] font-semibold text-white shadow-[0_18px_40px_rgba(24,144,255,0.28)] transition hover:bg-[#0d7de8] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login now"}
        </button>
      </form>

      <div className="mt-10 border-t border-black/8 pt-6">
        <p className="text-sm text-black/55">
          Dont have an account?{" "}
          <Link href={routes.register} className="font-semibold text-[#1890ff] transition hover:text-[#0d7de8]">
            Create New Account
          </Link>
        </p>
      </div>
    </div>
  );
}
