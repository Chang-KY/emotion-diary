import PageWrapper from "@/components/PageWrapper.tsx";

const NotFound = () => {
  return (
    <PageWrapper>
      <p className='text-lg dark:text-white text-black'>해당하는 URL의 페이지는 존재하지 않습니다.</p>
    </PageWrapper>
  );
};

export default NotFound;