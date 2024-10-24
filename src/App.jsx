import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Shared/Layout';
import Product from './Pages/Product';
import Home from './Pages/Home';
import Present from './Pages/Presentation';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import UserProfile from './Pages/UserProfile';
import Order from './Pages/LayoutOrder';
import OrderDetail from './Pages/OrderDetail';
import Login from './Components/Shared/Login';
import Search from './Pages/Search';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />

                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="product" element={<Product />} />
                    <Route path="search" element={<Search />} />
                    <Route path="presentation" element={<Present />} />
                    <Route path="productdetail/:producId" element={<ProductDetail />} />
                    <Route path="userprofile" element={<UserProfile />} />
                    <Route path="cart" element={<Cart />}></Route>
                    <Route path="order" element={<Order />}></Route>
                    <Route path="orderdetail" element={<OrderDetail />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
