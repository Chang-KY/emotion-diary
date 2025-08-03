import {Outlet} from "react-router-dom";

const Main = () => {
  return (
    <main className="w-full h-[calc(100%-4rem)] mx-auto">
      <Outlet/>
    </main>
  );
};

export default Main;