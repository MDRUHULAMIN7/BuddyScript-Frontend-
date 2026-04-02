import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
  illustration: string;
  illustrationDark?: string;
  wrapperClassName: string;
  contentClassName: string;
  mediaContainerClassName: string;
  mediaClassName: string;
  mediaDarkContainerClassName?: string;
  mediaDarkClassName?: string;
};

export function AuthShell({
  children,
  illustration,
  illustrationDark,
  wrapperClassName,
  contentClassName,
  mediaContainerClassName,
  mediaClassName,
  mediaDarkContainerClassName,
  mediaDarkClassName,
}: AuthShellProps) {
  return (
    <section className={wrapperClassName}>
      <div className="_shape_one">
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className={contentClassName}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className={mediaContainerClassName}>
                <div className={mediaClassName}>
                  <img src={illustration} alt="Illustration" className="_left_img" />
                </div>
                {illustrationDark && mediaDarkContainerClassName && mediaDarkClassName ? (
                  <div className={mediaDarkContainerClassName}>
                    <img src={illustrationDark} alt="Illustration" className={mediaDarkClassName} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
