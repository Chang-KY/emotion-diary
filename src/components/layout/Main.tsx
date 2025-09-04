import {Outlet} from "react-router-dom";

const Main = () => {
  return (
    <main className="w-full lg:h-full h-[calc(100%-4.5rem)] pb-10 lg:pb-0 mx-auto">
      <Outlet/>
    </main>
  );
};

export default Main;