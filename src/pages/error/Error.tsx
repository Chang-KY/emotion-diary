import NoticeTitle from "@/components/NoticeTitle.tsx";
import NoticeMessage from "@/components/NoticeMessage.tsx";
import PageWrapper from "@/components/PageWrapper.tsx";

const Error = () => {
  return (
    <PageWrapper>
      <NoticeTitle level='h2'>현재 에러가 발생했습니다.</NoticeTitle>
      <NoticeMessage>자세한 원인은 -----</NoticeMessage>
    </PageWrapper>
  );
};

export default Error;