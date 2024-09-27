import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Shared/Layout";
import Product from "./Pages/Product";
import Dashboard from "./Pages/Dashboard";
import Order from "./Pages/Order";
import Customer from "./Pages/Customer";
import AddProduct from "./Components/Product/AddProduct";
import ProductDetail from "./Components/Product/ProductDetail";
import OrderDetail from "./Pages/OrderDetail";
import CustomerDetail from "./Pages/CustomerDetail";
import Category from "./Pages/Category";
import Review from "./Pages/Review";

function AdminApp() {
  return (
    <Router>
      <Routes>
        <Route path="admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Order />} />
          <Route path="customer" element={<Customer />} />
          <Route path="customer/customerdetail/:customerId" element={<CustomerDetail />} />
          <Route path="product" element={<Product />} />
          <Route path="product/addproduct" element={<AddProduct />} />
          <Route path="product/productdetail/:productId" element={<ProductDetail />} />
          <Route path="order/orderdetail/:orderId" element={<OrderDetail />} />
          <Route path="category" element={<Category />} />
          <Route path="review" element={<Review />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AdminApp;
