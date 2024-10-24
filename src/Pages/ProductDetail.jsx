import React from "react";
import ProductMainDetail from "../Components/ProductDetail/ProductMainDetail";
import ReviewDisplay from "../Components/ProductDetail/ReviewDisplay";
import ReviewList from "../Components/ProductDetail/ReviewList";

function ProductDetail() {
  return (
    <div className="p-[6rem] w-[1200px] mx-auto">
      <ProductMainDetail />
      <div className="mb-[4rem]">
        <ReviewList />
      </div>
      <ReviewDisplay />
    </div>
  );
}

export default ProductDetail;
