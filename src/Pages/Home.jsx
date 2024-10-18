import Category from '../Components/Home/Category';
import Intro from '../Components/Home/Intro';
import ListProduct from '../Components/Shared/ListProduct';
import Slider from '../Components/Home/Slider';

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
