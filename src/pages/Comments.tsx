import Textarea from "@/components/Textarea.tsx";
import Button from "@/components/Button.tsx";
import {useCreateComment} from "@/hooks/useCreateComment.ts";
import {useState} from "react";
import ErrorMessage from "@/components/ErrorMessage.tsx";
import {useUpdateComment} from "@/hooks/useUpdateComment.ts";

const Comments = (props: { onClose: () => void, diaryId: string, comment?: string, commentId?: string }) => {
  const {onClose, diaryId, comment, commentId} = props;
  const updateComment = useUpdateComment(diaryId!);
  const createComment = useCreateComment(diaryId!);
  const [input, setInput] = useState(comment ? comment : "");
  const isSame = input === comment;
  const isEdit = !!commentId && !!comment;

  const handleSubmit = () => {
    if (!input.trim()) return;
    const onSuccess = () => {
      onClose();
      setInput('');
    };

    if (isEdit) {
      updateComment.mutate({commentId: Number(commentId), content: input}, {onSuccess});
    } else {
      createComment.mutate(input, {onSuccess});
    }
  };

  return (
    <div className='px-4'>
      <Textarea
        name="comment"
        placeholder="댓글을 입력하세요"
        value={input}
        rows={6}
        onChange={(e) => setInput(e.target.value)}
        className="border dark:border-gray-700 rounded px-2 py-1.5 text-sm"
      />
      <div className='flex items-center justify-end gap-3'>
        {isEdit && isSame && (
          <ErrorMessage msg='변경이 되지 않았습니다.'/>
        )}
        <Button variant='outlined'
                intent='warning'
                size='sm'
                onClick={onClose}>
          취소
        </Button>

        <Button variant='contained'
                intent='primary'
                onClick={handleSubmit}
                size='sm'
                disabled={!input || isSame}>
          등록
        </Button>
      </div>
    </div>
  );
};

export default Comments;