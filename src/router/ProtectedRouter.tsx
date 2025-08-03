import {Navigate} from "react-router-dom";
import {useAuthUser} from "@/hooks/useAuthUser.ts";
import Loading from "@/components/loading/Loading.tsx";
import type {ReactNode} from "react";
import PageWrapper from "@/components/PageWrapper.tsx";

const ProtectedRouter = ({children}: { children: ReactNode }) => {
  const {data: user, isLoading, isFetching} = useAuthUser();

  if (isLoading || isFetching) {
    return (
      <PageWrapper>
        <Loading title="현재 로그인 중입니다."/>
      </PageWrapper>
    );
  }
  if (!user) return <Navigate to="/start" replace/>;

  return children;
};

export default ProtectedRouter;