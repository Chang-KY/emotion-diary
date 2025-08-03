import {createPortal} from "react-dom";
import Loading from "@/components/loading/Loading.tsx";
import {fullScreenLoadingAtom} from "@/store/fullScreenLoadingAtom.ts";
import {useAtomValue} from 'jotai';

const FullScreenLoading = () => {
  const isLoading = useAtomValue(fullScreenLoadingAtom);
  const el = document.getElementById('fullscreen-loading-root');

  if (!el) return null;
  if (!isLoading) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <Loading title='잠시만 기다려주세요...'/>
    </div>,
    el
  );
};

export default FullScreenLoading;