import Textarea from "@/components/Textarea.tsx";

const Notification = () => {
  return (
    <div>
      <Textarea
        name="content"
        rows={7}
        placeholder="댓글을 남겨주세요."
      />
    </div>
  );
};

export default Notification;