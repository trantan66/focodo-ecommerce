import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import Slider from "./Slider";
import Intro from "./Intro";
import ListProduct from "./ListProduct";
import Category from "./Category";


export default function Layout() {
  return (
    <div>
      <Header />
      <Navigation />
      <Intro />
      <Slider />
      <ListProduct />
      <Category />
      <div className="p-40">
        <div></div>
        <div>{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
}
