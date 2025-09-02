import Footer from "@/components/layout/Footer.tsx";
import Header from "@/components/layout/Header.tsx";
import Main from "@/components/layout/Main.tsx";
import FullScreenLoading from "@/components/layout/FullScreenLoading.tsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useThemeDetector} from "@/hooks/useThemeDetector.ts";
import {useLocation} from "react-router-dom";
import usePageTitle from "@/hooks/usePageTitle.ts";
import useResponsive from "@/hooks/useResponsive.ts";
import SidePage from "@/components/layout/SidePage.tsx";
import {useSupabaseAuthListener} from "@/hooks/useSupabaseAuthListener.ts";

function App() {
  const theme = useThemeDetector();
  const location = useLocation();
  const {isLg} = useResponsive();
  const hideHeaderRoutes = [/^\/diary\/[^/]+$/]; // 예: /diary/1, /diary/abc123
  const shouldHideHeader = hideHeaderRoutes.some((regex) =>
    regex.test(location.pathname)
  );

  usePageTitle();
  useSupabaseAuthListener();

  return (
    <div className="dark:bg-black bg-white
     text-black dark:text-white w-full h-full min-h-full">
      {!shouldHideHeader && !isLg && <Header/>}
      {!isLg ?
        <Main/> :
        <div className='flex size-full'>
          <SidePage/>
          <Main/>
        </div>}
      {!shouldHideHeader && !isLg && <Footer/>}
      <FullScreenLoading/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme={theme}
      />
    </div>
  )
}

export default App
