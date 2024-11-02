import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Shared/Layout';
import Product from './Pages/Product';
import Home from './Pages/Home';
import Present from './Pages/Presentation';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import UserProfile from './Pages/UserProfile';
import Order from './Pages/LayoutOrder';
import Review from './Pages/ReviewPage';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="product/:categoryId" element={<Product />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="presentation" element={<Present />} />
                    <Route path="productdetail/:id" element={<ProductDetail />} />
                    <Route path="userprofile" element={<UserProfile />} />
                    <Route path="/Cart" element={<Cart />}></Route>
                    <Route path="/Order" element={<Order />}></Route>
                    <Route path="/review" element={<Review />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
