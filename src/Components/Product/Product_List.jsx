import { Product_Items } from "./Product_Items";
import React, { useState } from "react";
import { Rate } from "antd";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
const ArrangeFilter = [
  {
    key: "ByRating",
    value: "Theo đánh giá",
  },
  {
    key: "Ascending",
    value: "Giá từ thấp đến cao",
  },
  {
    key: "Descending",
    value: "Giá từ cao đến thấp",
  },
];

function ProductList(props) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/productdetail`);
    console.log(`${props.id}`);
  };
  return (
    <div className="flex flex-col item-center justify-between border border-black rounded-lg w-[266.67px] h-[400px] bg-[#F6F6F6]">
      <span className="ml-auto pr-2 text-[12px] text-red-600 font-semibold">
        {props.sale}
      </span>
      <div className="flex justify-center items-center mt-2">
        <Rate disabled defaultValue={props.rate}></Rate>
      </div>
      <img
        src={props.image}
        alt=""
        className="w-[160px] h-[160px] mx-auto mt-2 "
      />
      <span className="mx-auto italic font-semibold text-[16px]">
        {props.name}
      </span>
      <span className="mx-auto italic font-semibold text-[24px]">
        {props.price}
      </span>
      <button
        className="bg-black text-white mx-auto mb-3 w-[193px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300"
        onClick={handleButtonClick}
      >
        Mua ngay
      </button>
    </div>
  );
}

function Product_List() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(6);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const filterProducts = (products, value) => {
    if (value === "Giá từ thấp đến cao") {
      return products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    if (value === "Giá từ cao đến thấp") {
      return products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    if (value === "Theo đánh giá") {
      return products.sort((a, b) => b.rate - a.rate);
    }

    return products;
  };
  const currentProducts = filterProducts(Product_Items, selectedCategory).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="">
      <div className="flex ml-10">
        <span>Số lượng sản phẩm: </span>
        <span className="font-bold ml-1">85</span>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded ml-[500px]"
        >
          <option value="">Tất cả</option>
          {ArrangeFilter.map((item) => (
            <option key={item.key} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 ml-10 mt-3 gap-4 ">
        {currentProducts.map((item, index) => (
          
          <ProductList
            id={item.id}
            key={item.id}
            rate={item.rate}
            image={item.image}
            name={item.name}
            price={item.price}
            sale={item.sale}
          ></ProductList>
        ))}
      </div>
      <div className="mt-5">
        <Pagination
          showSizeChanger={false}
          current={currentPage}
          onChange={handlePageChange}
          total={Product_Items.length}
          pageSize={productsPerPage}
          className="flex justify-center items-center"
        />
      </div>
    </div>
  );
}

export default Product_List;
