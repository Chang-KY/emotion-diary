import {useMyProfile} from "@/hooks/useMyProfile.ts";
import Avatar from "@/components/Avatar.tsx";
import Button from "@/components/Button.tsx";
import {useEffect, useRef, useState} from "react";
import Textarea from "@/components/Textarea.tsx";
import EmotionPicker from "@/components/EmotionPicker.tsx";
import BottomKeyboardBar from "@/components/BottomKeyboardBar.tsx";
import {Controller, useForm} from "react-hook-form";
import {useWriteEmotionDiary} from "@/hooks/useWriteEmotionDiary.ts";
import type {WriteFormType} from "@/types/WriteFormType.ts";
import ShareScope from "@/components/ShareScope.tsx";
import SelectDay from "@/components/SelectDay.tsx";
import {useSetAtom} from "jotai";
import {fullScreenLoadingAtom} from "@/store/fullScreenLoadingAtom.ts";
import {useTodayDiary} from "@/hooks/useTodayDiary.ts";
import {uploadImageToDiary} from "@/utils/uploadImageToDiary.ts";
import {supabase} from "@/lib/supabase.ts";

const Write = ({setOpen, date}: { setOpen: () => void, date?: Date }) => {
  const userProfile = useMyProfile();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isValid},
    reset, watch
  } = useForm<WriteFormType>({
    defaultValues: {
      shareScope: 'private',
      date: date ? date : new Date(),
    },
  });
  const [removeImage, setRemoveImage] = useState(false);
  const selectedDate = watch('date');
  const {data: todayDiary, isLoading} = useTodayDiary(selectedDate || new Date());
  const setFullScreenLoading = useSetAtom(fullScreenLoadingAtom);
  const insertDiary = useWriteEmotionDiary('insert', userProfile?.id, {
    onMutate: () => setFullScreenLoading(true),
    onSuccess: () => {
      setFullScreenLoading(false);
      setOpen();
    },
    onError: (msg) => {
      setFullScreenLoading(false);
      alert(msg); // or toast
    },
  });
  const updateDiary = useWriteEmotionDiary('update', userProfile?.id, {
    onMutate: () => setFullScreenLoading(true),
    onSuccess: () => {
      setFullScreenLoading(false);
      setOpen();
    },
    onError: (msg) => {
      setFullScreenLoading(false);
      alert(msg);
    },
  });

  useEffect(() => {
    if (todayDiary) {
      reset({
        content: todayDiary.content,
        emotionType: todayDiary.emotion_type,
        date: selectedDate,
        shareScope: todayDiary.share_scope,
      });
    } else {
      reset({
        content: '',
        emotionType: undefined,
        date: selectedDate,
        shareScope: 'private',
      });
    }
  }, [todayDiary]);

  useEffect(() => {
    setFullScreenLoading(isLoading);
  }, [isLoading, setFullScreenLoading]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const onSubmit = async (data: WriteFormType) => {
    try {
      let imageUrl: string | null | undefined = todayDiary?.image_url;

      // 기존 이미지 삭제 요청
      if (removeImage && imageUrl) {
        const regex = new RegExp(`https://[^/]+/storage/v1/object/public/diary/`);
        const relativePath = imageUrl.replace(regex, "");

        if (relativePath && relativePath !== imageUrl) {
          const {error: deleteError} = await supabase.storage
            .from('diary')
            .remove([relativePath]);

          if (deleteError) {
            console.warn("이전 이미지 삭제 실패:", deleteError.message);
          } else {
            console.log("이전 이미지 삭제 성공:", relativePath);
          }

          imageUrl = null;
        }
      }

      // 새 이미지 업로드
      if (selectedImage) {
        imageUrl = await uploadImageToDiary(selectedImage, data.date, data.id);
      }

      const payload = {
        ...data,
        image_url: imageUrl ?? null,
      };

      if (todayDiary) {
        updateDiary.mutate({...payload, id: todayDiary.id});
      } else {
        insertDiary.mutate(payload);
      }
    } catch (error) {
      console.error('이미지 업로드 또는 삭제 실패:', error);
      alert('이미지 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='size-full mt-5'>
      <div className='absolute top-2 right-2 flex gap-3'>

        {!todayDiary &&
          <Button variant='text' size='sm' intent='primary'>
            임시 보관함
          </Button>}

        <Button
          disabled={!isValid}
          variant='contained'
          size='sm'
          intent='primary'
          type="submit"
        >
          {todayDiary ? '수정하기' : '게시하기'}
        </Button>

      </div>
      <div className='flex items-center justify-center mb-1'>
        <Controller
          control={control}
          name="emotionType"
          rules={{required: '감정을 선택해주세요.'}}
          render={({field}) => (
            <EmotionPicker selected={field.value} onSelect={field.onChange}/>
          )}
        />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Avatar src={userProfile?.profile_image}/>
          <Controller control={control}
                      render={({field}) => (
                        <SelectDay value={field.value} onChange={field.onChange}/>
                      )}
                      name='date'/>
        </div>
        <div className="flex items-center">
          <Controller
            control={control}
            name="shareScope"
            render={({field}) => (
              <ShareScope selected={field.value} onSelect={field.onChange}/>
            )}
          />
        </div>
      </div>
      {selectedImage && (
        <div className="my-2 flex flex-col items-center justify-center">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="선택된 이미지"
            className="max-w-full max-h-60 rounded"
          />
          <p className='font-bold text-indigo-500 dark:indigo-100'>
            오늘의 사진
          </p>
        </div>
      )}

      <Textarea
        name="content"
        rows={7}
        placeholder="내용을 입력하세요"
        register={register('content', {required: '내용은 필수입니다'})}
        errors={errors}
      />
      {todayDiary?.image_url && !removeImage && !selectedImage && (
        <div className="my-2 flex flex-col items-center justify-center">
          <img src={todayDiary.image_url} alt="기존 이미지" className="max-w-full max-h-60 rounded"/>
          <button
            type="button"
            onClick={() => setRemoveImage(true)}
            className="mt-1 text-red-500 underline text-sm"
          >
            이미지 삭제
          </button>
        </div>
      )}

      <BottomKeyboardBar
        onImageChange={(file: File) => {
          setSelectedImage(file);
          setRemoveImage(true);
        }}
      />

    </form>
  );
};

export default Write;