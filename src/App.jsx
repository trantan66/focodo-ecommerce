import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Shared/Layout";
import LayoutCart from "./Components/Shared/LayoutCart";
import LayoutOrder from "./Components/Shared/LayoutOrder";
import Product from "./Pages/Product";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
        </Route>
        <Route path="/Cart" element={<LayoutCart />}>

        </Route>
        <Route path="/Order" element={<LayoutOrder />}>

        </Route>
        <Route path="login" element={<div>login page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
