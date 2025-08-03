import {forwardRef, useImperativeHandle, useRef, useEffect, type TextareaHTMLAttributes} from 'react';
import clsx from "clsx";
import type {FieldErrors, UseFormRegisterReturn} from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage.tsx";

type TextareaProps = {
  placeholder?: string;
  className?: string;
  rows?: number;
  errors?: FieldErrors;
  name: string;
  register?: UseFormRegisterReturn;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({placeholder, className, rows = 1, errors, register, name, ...rest}, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);

    // 부모에게 ref 노출
    useImperativeHandle(ref, () => innerRef.current!);

    const handleResizeHeight = () => {
      const el = innerRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    };

    useEffect(() => {
      handleResizeHeight(); // 초기 렌더 시 1회 조절
    }, []);

    return (
      <div className="flex-1 overflow-auto min-h-0 mt-3">
        <textarea
          ref={(el) => {
            innerRef.current = el;
            if (register?.ref) register.ref(el);
          }}
          placeholder={placeholder}
          rows={rows}
          onInput={(e) => {
            handleResizeHeight();
            register?.onChange?.(e); // form 상태 업데이트
          }}
          onBlur={register?.onBlur}
          name={register?.name}
          className={clsx(
            `w-full py-1.5 px-1 dark:text-white resize-none border-none
             focus:outline-none bg-transparent text-base leading-relaxed`,
            className
          )}
          {...rest}
        />
        <ErrorMessage msg={errors?.[name]?.message as string}/>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
