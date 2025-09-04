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
  - 768px 이상이면 isSm === true
  - 768px 미만이면 isSm === false
  */
  const isSm = useMediaQuery("(min-width: 768px)");
  /*
화면 너비가 864px 이상일 때 true를 반환합니다.
- 864px 이상이면 isMd === true
- 864px 미만이면 isMd === false
*/
  const isMd = useMediaQuery("(min-width: 864px)");
  /*
  화면 너비가 1024px 이상일 때 true를 반환합니다.
  - 1024px 이상이면 isLg === true
  - 1024px 미만이면 isLg === false
  */
  const isLg = useMediaQuery("(min-width: 1024px)");
  /*
  화면 너비가 1280px 이상일 때 true를 반환합니다.
  - 1280px 이상이면 isXl === true
  - 1280px 미만이면 isXl === false
  */
  const isXl = useMediaQuery("(min-width: 1280px)");
  /*
  화면 너비가 1536px 이상일 때 true를 반환합니다.
  - 1536px 이상이면 is2Xl === true
  - 1536px 미만이면 is2Xl === false
  */
  const is2xl = useMediaQuery("(min-width: 1536px)");

  return {isXs, isSm, isMd, isLg, isXl, is2xl};
};

export default useResponsive;
