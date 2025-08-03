import clsx from "clsx";
import './Loading.css';

type LoadingProps = {
  title?: string;
  className?: string;
};

const Loading = (props: LoadingProps) => {
  const {title, className} = props;
  return (
    <div className={clsx(`flex flex-col gap-1.5 items-center justify-center size-full`, className)}>
      {title && <p className='dark:text-white text-black'>{title}</p>}
      <div className="loader animate-loader"/>
    </div>
  );
};

export default Loading;
