import logo from '@/assets/logo.webp';
import {useLogin} from "@/hooks/useLogin.ts";
import PageWrapper from "@/components/PageWrapper.tsx";
import {useAuthUser} from "@/hooks/useAuthUser.ts";
import {Navigate} from "react-router-dom";
import Loading from "@/components/loading/Loading.tsx";

const Start = () => {
  const {mutate, isPending} = useLogin();
  const {data: user, isLoading} = useAuthUser();

  if (isLoading) return <Loading/>;
  if (user) return <Navigate to="/home" replace/>;

  return (
    <PageWrapper>
      <img src={logo} alt="logo" className="size-20"/>
      <h3 className='dark:text-white text-black text-4xl'>Todo List</h3>
      <p className="dark:text-gray-500 text-gray-700">해야 할 일, 중요한 일을 기록해주세요.</p>
      <div className='flex flex-col mt-2 gap-3 w-full max-w-xs'>
        <button
          disabled={isPending}
          onClick={() => mutate('kakao')}
          className='bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 rounded shadow h-12 border border-yellow-300'
        >
          카카오 토크로 로그인
        </button>

        <button
          disabled={isPending}
          onClick={() => mutate('google')}
          className='bg-white hover:bg-gray-100 border border-gray-300 text-black font-semibold py-2 rounded shadow flex items-center justify-center gap-2 h-12'
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="size-5"/>
          Google로 로그인
        </button>
      </div>
    </PageWrapper>
  );
};

export default Start;