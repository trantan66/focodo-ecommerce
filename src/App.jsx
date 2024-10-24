import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Shared/Layout';
import Product from './Pages/Product';
import Home from './Pages/Home';
import Present from './Pages/Presentation';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import UserProfile from './Pages/UserProfile';
import Order from './Pages/LayoutOrder';
import Login from './Components/Shared/Login';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/FP_Step1" element={<FP_Step1 />} />
                <Route path="/FP_Step2" element={<FP_Step2 />} />
                <Route path="/FP_Step3" element={<FP_Step3 />} />

                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="product" element={<Product />} />
                    <Route path="search" element={<Search />} />
                    <Route path="presentation" element={<Present />} />
                    <Route path="productdetail/:producId" element={<ProductDetail />} />
                    <Route path="userprofile" element={<UserProfile />} />
                    <Route path="cart" element={<Cart />}></Route>
                    <Route path="order" element={<Order />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
