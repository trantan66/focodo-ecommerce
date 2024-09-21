import React from "react";
import { Link } from "react-router-dom";
import Filter from "../Components/Shared/Product_Page_Items/Filter";
import Product_List from "../Components/Shared/Product_Page_Items/Product_List";

function Product() {
  return (
    
    <div>
      <div>This is Product page</div>
      <Link className="underline" to="/">
        to home
      </Link>
      <div className="flex justify-center">
        <Filter></Filter>
        <Product_List></Product_List>
      </div>
    </div>
  );
}

export default Product;
