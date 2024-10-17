import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Shared/Layout';
import LayoutCart from './Components/Shared/LayoutCart';
import LayoutOrder from './Components/Shared/LayoutOrder';
import Product from './Pages/Product';
import Home from './Pages/Home';
import Present from './Pages/Presentation';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Order2 from './Pages/OrderStep2';
import Order3 from './Pages/OrderStep3';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="product" element={<Product />} />
                    <Route path="presentation" element={<Present />} />
                    <Route path="productdetail/:producId" element={<ProductDetail />} />
                </Route>
                <Route path="/Cart" element={<LayoutCart />}></Route>
                <Route path="/Order" element={<LayoutOrder />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
