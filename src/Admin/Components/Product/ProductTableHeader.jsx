import { Select } from "antd";
import React from "react";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { Link } from "react-router-dom";
import "../CustomCss/CustomSelect.css";

function ProductTableHeader({
  searchTerm,
  onSearchChange,
  productsPerPage,
  onProductsPerPageChange,
  selectedCategory,
  setSelectedCategory,
  categories = [],
}) {
  return (
    <div className="flex justify-between items-center bg-[#282941] pb-2 ">
      <div className="flex items-center">
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="ext-sm focus:outline-none border border-gray-300 w-[20rem] h-10 pl-10 pr-4 rounded-sm bg-[#282941] text-white"
          placeholder="Tìm kiếm sản phẩm"
        />
      </div>

      <div className="flex items-center ">
        {/* <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 pr-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-[#282941]"
        >
          <option value="">Tất cả danh mục</option>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>No categories available</option>
          )}
        </select> */}

        <Select
          id="categoryFilter"
          defaultValue={selectedCategory || "Tất cả danh mục"}
          style={{
            width: 250,
            height: 40,
            backgroundColor: "#282941",
          }}
          onChange={(value) => {
            setSelectedCategory(value);
          }}
          dropdownStyle={{
            maxHeight: 300,
            overflowY: "auto",
            backgroundColor: "#282941",
          }}
          options={
            Array.isArray(categories)
              ? categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))
              : []
          }
        />

        <select
          id="productsPerPage"
          value={productsPerPage}
          onChange={(e) => onProductsPerPageChange(parseInt(e.target.value))}
          className="p-2 pr-5 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
          bg-[#282941] text-white"
        >
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <Link
          to={"addproduct"}
          className="bg-blue-500 ml-2 rounded-md p-2 text-white flex justify-items-center items-center"
        >
          <MdOutlineAddToPhotos className="mr-1" />
          Thêm sản phẩm
        </Link>
      </div>
    </div>
  );
}

export default ProductTableHeader;
