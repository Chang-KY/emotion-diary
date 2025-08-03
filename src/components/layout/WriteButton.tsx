import {useState} from "react";
import {FaPen} from 'react-icons/fa';
import Modal from "@/components/Modal.tsx";
import Write from "@/pages/Write.tsx";

const WriteButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className=''>
      <button
        className="fixed bottom-12 right-4 z-50 size-7 rounded-full p-2 bg-black dark:bg-white text-white dark:text-black shadow-lg hover:scale-105 transition-transform"
        aria-label="기록하기"
        onClick={() => setOpen(true)}
      >
        <FaPen className="text-xs"/>
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Write setOpen={() => setOpen(false)}/>
      </Modal>
    </div>
  );
};

export default WriteButton;