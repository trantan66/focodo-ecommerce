import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";


export default function Layout() {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="p-40">
        <div></div>
        <div>{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
}
