import Button from "@/components/Button.tsx";
import Modal from "@/components/Modal.tsx";
import {useState} from "react";
import {CATEGORY, type CategoryType, emotions} from "@/constants/emotions.ts";
import type {FieldErrors} from "react-hook-form";
import {TiPlus} from "react-icons/ti";

type EmotionPickerProps = {
  selected: string;
  onSelect: (emotionType: string) => void;
  errors?: FieldErrors<{ emotion?: string }>;
};

const EmotionPicker = ({selected, onSelect, errors}: EmotionPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<CategoryType>(CATEGORY.POSITIVE);

  const categoryLabels: Record<CategoryType, string> = {
    [CATEGORY.POSITIVE]: '긍정',
    [CATEGORY.NEUTRAL]: '중립',
    [CATEGORY.NEGATIVE]: '부정',
  };

  const hasError = !!errors?.emotion;

  return (
    <div className="flex flex-col gap-1">
      <Button
        onClick={() => setIsOpen(true)}
        variant="text_underline"
        intent={hasError ? 'error' : 'success'}
        size="lg"
        className="px-0"
      >
        {selected
          ?
          <div
            className='flex flex-col items-center justify-center gap-1'>
            <p className='text-4xl'>{emotions.find(e => e.type === selected)?.emoji}</p>
            <p className='text-xs '>({emotions.find(e => e.type === selected)?.label})</p>
          </div>
          : <div
            className="flex flex-col items-center justify-center p-1
             hover:bg-gray-100 dark:hover:bg-gray-800 border size-20 p-3 border-dotted border-gray-400 rounded-full
             cursor-pointer transition">
            <TiPlus className="text-4xl"/>
            <p className='text-xs '>(오늘의 감정)</p>
          </div>}
      </Button>

      {hasError && (
        <p className="text-sm text-red-500">{errors?.emotion?.message}</p>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          {/* 카테고리 선택 버튼 */}
          <div className="flex justify-center gap-3">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategory(key as CategoryType)}
                className={`px-4 py-1 rounded-full text-sm font-semibold border transition-colors duration-150
                  ${category === key
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'}
                `}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="w-full h-[1px] bg-white"/>

          {/* 감정 리스트 */}
          <div className="flex flex-wrap gap-2 justify-start px-4">
            {emotions
              .filter((e) => e.category === category)
              .map((e) => (
                <button
                  key={e.type}
                  className="
                    px-3 py-2 rounded-full text-sm
                    bg-gray-100 text-gray-800 hover:bg-gray-200
                    dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
                    transition-colors duration-150 relative
                  "
                  onClick={() => {
                    onSelect(e.type);
                    setIsOpen(false);
                  }}
                >
                  {e.emoji} {e.label}
                  {selected === e.type &&
                    <div
                      className="absolute border-2 border-blue-400 dark:border-blue-300 rounded-full inset-0 pointer-events-none"/>
                  }
                </button>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmotionPicker;
