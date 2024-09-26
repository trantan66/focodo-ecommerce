import { Outlet } from "react-router-dom";
import Footer from "./Footer"
import Header from "./Header"
import ProdDetail from "./Cart"
import Navigation from "./Navigation";

function ProductDetails() {
    return (
        <>
            <Header />
            <Navigation />
            <ProdDetail />
            <Footer />
        </>
    )
}

export default ProductDetails