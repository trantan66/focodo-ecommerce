import { Product_Items } from "./Product_Items";
import React, { useState } from "react";
import { Rate } from "antd";
import { Pagination } from "antd";

const ArrangeFilter = [
  {
    key: "ByRating",
    value: "Theo đánh giá",
  },
  {
    key: "Ascending",
    value: "giá từ thấp đến cao",
  },
  {
    key: "Descending",
    value: "giá từ cao đến thấp",
  },
];

function ProductList(props) {
  return (
    <div className="flex flex-col item-center justify-between border border-black rounded-lg w-[266.67px] h-[400px] bg-[#F6F6F6]">
      <div className="flex justify-center items-center mt-2">
        <Rate defaultValue={props.rate}></Rate>
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
      <button className="bg-black text-white mx-auto mb-3 w-[193px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300">
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
    if (value === "Gia tang dan") {
      return products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    if (value === "Gia giam dan") {
      return products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    if (value === "Theo danh gia") {
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
        <p>
          Số lượng sản phẩm: <span class="font-bold">85</span>
        </p>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded ml-[600px]"
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
            key={item.id}
            rate={item.rate}
            image={item.image}
            name={item.name}
            price={item.price}
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
