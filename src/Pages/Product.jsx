import React from "react";
import Filter from "../Components/Product/Filter";
import ProductList from "../Components/Product/Product_List";


function Product() {
  return (
    
    <div>
      <div className="flex justify-center mx-auto my-4 w-[1200px]">
        <Filter/>
        <ProductList/>
      </div>
    </div>
  );
}

export default Product;
