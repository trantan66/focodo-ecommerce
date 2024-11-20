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
import OrderDetail from './Pages/OrderDetail';
import Search from './Pages/Search';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword1 from './Pages/ForgotPassword1';
import ForgotPassword2 from './Pages/ForgotPassword2';
import ForgotPassword3 from './Pages/ForgotPassword3';

import PrivateRoutes from './Roots/PrivateRoutes';
import AuthRoutes from './Roots/AuthRoutes';
import AdminLayout from './Admin/Components/Shared/Layout';
import AdminProduct from './Admin/Pages/Product';
import AdminDashboard from './Admin/Pages/Dashboard';
import AdminOrder from './Admin/Pages/Order';
import AdminCustomer from './Admin/Pages/Customer';
import AdminProductDetail from './Admin/Components/Product/ProductDetail';
import AdminOrderDetail from './Admin/Pages/OrderDetail';
import AdminCustomerDetail from './Admin/Pages/CustomerDetail';
import AdminCategory from './Admin/Pages/Category';
import AdminReview from './Admin/Pages/Review';
import AdminAddProduct from './Admin/Components/AddProduct/AddProduct';
import AdminProfile from './Admin/Pages/Profile';

import CompleteOrder from './Components/Shared/CompleteOrder';
import ErrorOrder from './Components/Shared/ErrorOrder';
import Notification from './Admin/Pages/Notification';
import Voucher from './Admin/Pages/Voucher';

const roles = {
    user: 'USER',
    admin: 'ADMIN',
};
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="product/:categoryId" element={<Product />} />
                    <Route path="review/:orderId" element={<Review />} />
                    <Route path="search" element={<Search />} />
                    <Route path="presentation" element={<Present />} />
                    <Route path="productdetail/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />}></Route>
                    <Route path="order" element={<Order />}></Route>
                    <Route path="orderdetail/:id" element={<OrderDetail />}></Route>
                    <Route element={<AuthRoutes />}>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="register" element={<Register />}></Route>
                        <Route path="forgotpassword1" element={<ForgotPassword1 />}></Route>
                        <Route path="forgotpassword2" element={<ForgotPassword2 />}></Route>
                        <Route path="forgotpassword3" element={<ForgotPassword3 />}></Route>
                    </Route>
                    <Route element={<PrivateRoutes allowedRoles={[roles.user, roles.admin]} />}>
                        <Route path="userprofile" element={<UserProfile />} />
                    </Route>
                </Route>
                <Route element={<PrivateRoutes allowedRoles={[roles.admin]} />}>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="product" element={<AdminProduct />} />
                        <Route path="order" element={<AdminOrder />} />
                        <Route path="customer" element={<AdminCustomer />} />
                        <Route path="customer/customerdetail/:customerId" element={<AdminCustomerDetail />} />
                        <Route path="product" element={<AdminProduct />} />
                        <Route path="product/addproduct" element={<AdminAddProduct />} />
                        <Route path="product/productdetail/:productId" element={<AdminProductDetail />} />
                        <Route path="order/orderdetail/:orderId" element={<AdminOrderDetail />} />
                        <Route path="category" element={<AdminCategory />} />
                        <Route path="review" element={<AdminReview />} />
                        <Route path="profile" element={<AdminProfile />} />
                        <Route path="notification" element={<Notification />} />
                        <Route path="voucher" element={<Voucher />} />
                    </Route>
                </Route>

                <Route path="CompleteOrder" element={<CompleteOrder />}></Route>
                <Route path="ErrorOrder" element={<ErrorOrder />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
