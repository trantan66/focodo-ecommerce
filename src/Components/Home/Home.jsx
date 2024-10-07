import Intro from "./Intro";
import ListProduct from "./ListProduct";
import Category from "./Category";
import Slider from "./Slider";

export default function Home() {
  return (
    <div>
      <Intro />
      <Slider />
      <ListProduct />
      <Category />
    </div>
  );
}
