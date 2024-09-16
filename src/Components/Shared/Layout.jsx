import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";


export default function Layout() {
  return (
    <div>
      <Header />
      <div className="p-40">
        <div></div>
        <div>{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
}
