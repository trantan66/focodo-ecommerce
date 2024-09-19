import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-row bg-[#232333] h-screen w-screen overflow-y-scroll">
        <Sidebar />
      <div className="flex-1">
        <Header />
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}
