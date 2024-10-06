import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Shared/Layout";
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import Present from "./Pages/Presentation";
import Authentication from "./Pages/Authentication";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="presentation" element={<Present />} />
        </Route>
          <Route path="auth" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;
