import Button from "@/components/Button.tsx";
import {useEffect, useState} from "react";
import Modal from "@/components/Modal.tsx";
import {ShareScopes} from "@/constants/ShareScopes.tsx";
import NoticeTitle from "@/components/NoticeTitle.tsx";
import {IoIosArrowDropdown} from "react-icons/io";

type ShareScopeProps = {
  selected?: string;
  onSelect: (emotionType: string) => void;
};

const ShareScope = ({selected = 'private', onSelect}: ShareScopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState(selected);

  useEffect(() => {
    setTempSelected(selected);
  }, [selected]);

  const handleConfirm = () => {
    onSelect(tempSelected);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="text_underline"
        intent='secondary'
        size="sm"
      >
        {ShareScopes.find(e => e.value === selected)?.icon}
        <span className='flex items-center gap-0.5'>{ShareScopes.find(e => e.value === selected)?.label}
          <IoIosArrowDropdown/>
        </span>
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} variant='bottom-sheet'>
        <NoticeTitle level='h6' className='text-center mt-2 mb-3 border-b
         pb-3 border-gray-100 dark:border-gray-900'>
          공개 설정
        </NoticeTitle>
        <div className='px-3 flex flex-col gap-5'>
          {ShareScopes.map((ss) => (
            <div key={ss.value} className="relative flex items-start px-2">
              <div className="min-w-0 flex-1 text-sm/6">
                <label htmlFor={ss.value} className="cursor-pointer flex items-center gap-5">
                  {ss.icon}
                  {ss.label}
                </label>
              </div>
              <div className="ml-3 flex h-6 items-center">
                <input
                  type="radio"
                  id={ss.value}
                  name="shareScope"
                  value={ss.value}
                  checked={tempSelected === ss.value}
                  onChange={() => setTempSelected(ss.value)}
                  className="accent-indigo-600 size-4"
                />
              </div>
            </div>
          ))}
          <Button onClick={handleConfirm} size="md" variant="contained" intent="primary" className="">
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ShareScope;