import type {ReactNode} from "react";
import clsx from "clsx";

type PageWrapperProps = {
  children: ReactNode;
  className?: string;
};
const PageWrapper = (props: PageWrapperProps) => {
  const {children, className} = props;
  return (
    <div
      className={clsx(`flex flex-col items-center justify-center dark:bg-black bg-white min-h-full gap-2.5`, className)}>
      {children}
    </div>
  );
};

export default PageWrapper;