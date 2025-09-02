import {useMediaQuery} from "usehooks-ts";

const useResponsive = () => {
  /*
  화면 너비가 640px 이상일 때 true를 반환합니다.
  - 640px 이상이면 isXs === true
  - 640px 미만이면 isXs === false
  */
  const isXs = useMediaQuery("(min-width: 640px)");
  /*
  화면 너비가 768px 이상일 때 true를 반환합니다.
  - 768px 이상이면 isXs === true
  - 768px 미만이면 isXs === false
  */
  const isSm = useMediaQuery("(min-width: 768px)");
  /*
  화면 너비가 1024px 이상일 때 true를 반환합니다.
  - 1024px 이상이면 isXs === true
  - 1024px 미만이면 isXs === false
  */
  const isLg = useMediaQuery("(min-width: 1024px)");
  /*
  화면 너비가 1280px 이상일 때 true를 반환합니다.
  - 1280px 이상이면 isXs === true
  - 1280px 미만이면 isXs === false
  */
  const isXl = useMediaQuery("(min-width: 1280px)");
  /*
  화면 너비가 1536px 이상일 때 true를 반환합니다.
  - 1536px 이상이면 isXs === true
  - 1536px 미만이면 isXs === false
  */
  const is2xl = useMediaQuery("(min-width: 1536px)");

  return {isXs, isSm, isLg, isXl, is2xl};
};

export default useResponsive;
