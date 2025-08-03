import Button from "@/components/Button.tsx";
import DayPick from "@/components/DayPick.tsx";
import Modal from "@/components/Modal.tsx";
import {useState} from "react";
import NoticeTitle from "@/components/NoticeTitle.tsx";
import {format} from "date-fns";
import {ko} from "date-fns/locale";

type SelectDayProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

const SelectDay = ({value, onChange}: SelectDayProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const formattedDate = format(value ?? new Date(), "yyyy년 M월 d일", {locale: ko});

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant='text'
        size='sm'
        intent='secondary'>
        {formattedDate}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} variant='bottom-sheet'>
        <NoticeTitle level='h6' className='text-center mt-2 mb-3 border-b
         pb-3 border-gray-100 dark:border-gray-900'>
          날짜 설정
        </NoticeTitle>
        <div className='px-3 size-full flex flex-col items-center justify-center'>
          <DayPick
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
            }}
          />

          <Button size="md"
                  variant="contained"
                  onClick={() => setIsOpen(false)}
                  intent="primary"
                  className="w-full  max-w-xs">
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectDay;