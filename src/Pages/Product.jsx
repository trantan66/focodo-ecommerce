import React from "react";
import Filter from "../Components/Product/Filter";
import ProductList from "../Components/Product/Product_List";


function Product() {
  return (
    
    <div>
      <div className="flex justify-center my-4">
        <Filter/>
        <ProductList/>
      </div>
    </div>
  );
}

export default Product;
