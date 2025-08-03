import {FaArrowUp} from "react-icons/fa6";

const UpButton = ({onClick}: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className='fixed max-w-5xl bottom-[5.4rem] right-4 flex
      bg-black dark:bg-white text-white dark:text-black
      rounded-full p-2 size-7 shadow-lg hover:scale-105 transition-transform
      items-center justify-center z-50'
    >
      <FaArrowUp className='text-xs'/>
    </button>
  );
};

export default UpButton;