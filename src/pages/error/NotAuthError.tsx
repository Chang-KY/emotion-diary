import PageWrapper from "@/components/PageWrapper.tsx";
import NoticeTitle from "@/components/NoticeTitle.tsx";
import NoticeMessage from "@/components/NoticeMessage.tsx";

const NotAuthError = () => {
  return (
    <PageWrapper>
      <NoticeTitle level='h2'>인증된 사용자가 아닙니다.</NoticeTitle>
      <NoticeMessage>Google, Kakao 로 로그인을 해주시길 바랍니다.</NoticeMessage>
    </PageWrapper>
  );
};

export default NotAuthError;