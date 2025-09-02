import {Outlet} from "react-router-dom";

const Main = () => {
  return (
    <main className="w-full lg:h-full h-[calc(100%-4rem)] pb-9 lg:pb-0 mx-auto">
      <Outlet/>
    </main>
  );
};

export default Main;