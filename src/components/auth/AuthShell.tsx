import type { ReactNode } from "react";
import { clsx } from "clsx";

type AuthShellProps = {
  children: ReactNode;
  illustration: string;
  illustrationDark?: string;
  mediaAlign?: "left" | "right";
};

export function AuthShell({
  children,
  illustration,
  illustrationDark,
  mediaAlign = "left",
}: AuthShellProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f7f8fc]">
      <img
        src="/assets/images/shape1.svg"
        alt=""
        className="pointer-events-none absolute left-0 top-0 w-45 max-w-[28vw] opacity-95"
      />
      <img
        src="/assets/images/shape2.svg"
        alt=""
        className="pointer-events-none absolute right-0 top-[8%] w-50 max-w-[30vw] opacity-95"
      />
      <img
        src="/assets/images/shape3.svg"
        alt=""
        className="pointer-events-none absolute bottom-0 right-[8%] w-65 max-w-[34vw] opacity-95"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(360px,420px)] lg:gap-14">
          <div
            className={clsx(
              "order-2 flex justify-center lg:order-1",
              mediaAlign === "right" ? "lg:justify-end" : "lg:justify-start",
            )}
          >
            <div className="relative w-full max-w-180">
              <img
                src={illustration}
                alt="Buddy Script illustration"
                className="mx-auto block w-full max-w-180 object-contain"
              />
              {illustrationDark ? (
                <img
                  src={illustrationDark}
                  alt=""
                  className="pointer-events-none absolute inset-0 hidden h-full w-full object-contain dark:block"
                />
              ) : null}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mx-auto w-full max-w-105 rounded-[30px] bg-white/92 p-6 shadow-[0_32px_80px_rgba(17,32,50,0.08)] backdrop-blur sm:p-8 lg:ml-auto lg:p-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
