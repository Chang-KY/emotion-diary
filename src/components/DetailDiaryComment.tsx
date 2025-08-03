import Loading from "@/components/loading/Loading.tsx";
import Avatar from "@/components/Avatar.tsx";
import PopoverMenu from "@/components/PopoverMenu.tsx";
import {FaEllipsis} from "react-icons/fa6";
import {useComments} from "@/hooks/useComments.ts";
import {useMyProfile} from "@/hooks/useMyProfile.ts";
import {useDeleteComment} from "@/hooks/useDeleteComment.ts";
import Modal from "@/components/Modal.tsx";
import Comments from "@/pages/Comments.tsx";
import {useState} from "react";

const DetailDiaryComment = ({id}: { id?: string }) => {
  const {data: comments, isLoading: commentsLoading, error: commentsError} = useComments(id);
  const myProfile = useMyProfile();
  const deleteComment = useDeleteComment(id!);
  const [activeCommentId, setActiveCommentId] = useState<number | null | string>(null);

  const handleDelete = (commentId: number | string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteComment.mutate(commentId);
    }
  };
  console.log(comments);

  if (commentsError) return <div className="p-4 text-red-500">에러: {commentsError.message}</div>;
  return (
    <div className="mt-6 space-y-5">
      {commentsLoading && <Loading title='댓글을 가져오는 중...'/>}
      {!commentsLoading && comments?.length === 0 ? (
        <p className="text-sm text-gray-400">댓글이 없습니다.</p>
      ) : (
        comments?.map((comment) => {
          const isMyComment = comment.commenter_id[0]?.id === myProfile?.id;

          return (
            <div key={comment.id} className="border-b relative border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex items-start gap-3">
                <Avatar src={comment.commenter_id[0]?.profile_image} alt="user"/>
                <div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-white flex items-center">
                    {comment.commenter_id[0]?.nickname}
                    {isMyComment &&
                      <span className="text-xs text-blue-500 ml-1">
                              (나)
                          </span>}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-all">
                    {comment.content}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(comment.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className='absolute -top-1.5 right-0'>
                <ul>
                  <li>
                    <PopoverMenu
                      popoverPanelLocation="left"
                      title={
                        <div className="rounded-full flex items-center justify-center">
                          <FaEllipsis className="text-xl text-gray-600 dark:text-gray-300"/>
                        </div>
                      }
                    >
                      {({close}) => (
                        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                          <button
                            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => {
                              setActiveCommentId(comment.id);
                              close(); // 팝오버 닫기
                            }}
                          >
                            수정
                          </button>
                          <button
                            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => {
                              handleDelete(comment.id);
                              close(); // ✅ 팝오버 닫기
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </PopoverMenu>
                  </li>
                </ul>
              </div>
              <Modal
                isOpen={activeCommentId === comment.id}
                onClose={() => setActiveCommentId(null)}
                variant="bottom-sheet"
              >
                <Comments
                  onClose={() => setActiveCommentId(null)}
                  diaryId={id!}
                  comment={comment.content}
                  commentId={comment.id}
                />
              </Modal>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DetailDiaryComment;