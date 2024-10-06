import { Outlet } from "react-router-dom";
import Footer from "./Footer"
import Header from "./Header"
import ProdDetail from "./Order"
import Navigation from "./Navigation";

function LayoutOrder() {
    return (
        <>
            <Header />
            <Navigation />
            <ProdDetail />
            <Footer />
        </>
    )
}

export default LayoutOrder