import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Shared/Layout";
import Product from "./Pages/Product";
import Dashboard from "./Pages/Dashboard";
import Order from "./Pages/Order";
import Customer from "./Pages/Customer";
import Transaction from "./Pages/Transaction";
import Message from "./Pages/Message";
import AddProduct from "./Components/Product/AddProduct";

function AdminApp() {
  return (
    <Router>
      <Routes>
        <Route path="admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Order />} />
          <Route path="customer" element={<Customer />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="message" element={<Message />} />
          <Route path="product" element={<Product />} />
          <Route path="product/addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AdminApp;
