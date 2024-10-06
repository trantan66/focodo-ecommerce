import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product_Items } from "../Components/Shared/Product_Page_Items/Product_Items";
import ProductMainDetail from "../Components/Shared/ProductDetail_Items/ProductMainDetail";
import ReviewList from "../Components/Shared/ProductDetail_Items/ReviewList";
import ReviewDisplay from "../Components/Shared/ProductDetail_Items/ReviewDisplay";
const ProductDetail = () => {
  // const { id } = useParams();
  // const [product, setProduct] = useState(Product_Items);
  // useEffect(() => {
  //   console.log("ID lấy từ URL:", id);
  //   const foundProduct = Product_Items.find((item) => item.id === String(id));
  //   setProduct(foundProduct);
  // }, [id]);
  // if (!product) {
  //   return <div>Đang tải thông tin sản phẩm...</div>;
  // }
  return (
    <div className="">
      <div className="">
        <ProductMainDetail></ProductMainDetail>
        <ReviewList></ReviewList>
        <br></br>
        <br></br>
        <ReviewDisplay></ReviewDisplay>
      </div>
    </div>
  );
};

export default ProductDetail;
