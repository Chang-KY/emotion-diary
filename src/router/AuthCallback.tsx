import {useNavigate} from "react-router-dom";
import {useInsertUserIfNotExist} from "@/hooks/useInsertUserIfNotExist.ts";
import {useEffect} from "react";
import Loading from "@/components/loading/Loading.tsx";
import PageWrapper from "@/components/PageWrapper.tsx";
import {supabase} from "@/lib/supabase.ts";

const AuthCallback = () => {
  const navigate = useNavigate();
  const {mutate} = useInsertUserIfNotExist();

  useEffect(() => {
    const checkSession = async () => {
      let retryCount = 0;
      let session = null;

      // 5초간 최대 3번까지 세션 시도
      while (!session && retryCount < 3) {
        const {data} = await supabase.auth.getSession();
        session = data.session;

        if (!session) {
          await new Promise((res) => setTimeout(res, 500)); // 0.5초 대기
          retryCount++;
        }
      }

      if (session?.user) {
        mutate(); // 유저가 있으면 DB에 저장 시도
        navigate('/my-list');
      } else {
        console.error('세션 없음 - 로그인 실패');
        navigate('/start');
      }
    };

    checkSession().then();
  }, []);

  return (
    <PageWrapper>
      <Loading title="로그인 처리 중..."/>
    </PageWrapper>
  );
};

export default AuthCallback;
