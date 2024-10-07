import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Shared/Layout";
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import Present from "./Pages/Presentation";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="presentation" element={<Present/>} />
          <Route path="productdetail/:producId" element={<ProductDetail/>} />
          <Route path="cart" element={<Cart/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
