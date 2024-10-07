import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Shared/Layout";
import LayoutCart from "./Components/Shared/LayoutCart";
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import Authentication from "./Pages/Authentication";
import Presentation from "./Pages/Presentation";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="presentation" element={<Presentation />} />
        </Route>
        <Route path="/Cart" element={<LayoutCart />} />
        <Route path="auth" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;
