import React from "react";
import Filter from "../Components/Shared/Product_Page_Items/Filter";
import ProductList from "../Components/Shared/Product_Page_Items/Product_List";

function Product() {
  return (
    
    <div>
      <div className="flex justify-center">
        <Filter></Filter>
        <ProductList></ProductList>
      </div>
    </div>
  );
}

export default Product;
