import React from "react";
import { MdOutlineAddToPhotos } from "react-icons/md";

function ProductTableHeader({
  searchTerm,
  onSearchChange,
  productsPerPage,
  onProductsPerPageChange,
  selectedCategory,
  setSelectedCategory,
  categories,
}) {
  return (
    <div className="flex justify-between items-center bg-white border-b pb-2 border-gray-200">
      <div className="flex items-center">
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="ext-sm focus:outline-none border border-gray-300 w-[20rem] h-10 pl-10 pr-4 rounded-sm"
          placeholder="Tìm kiếm sản phẩm"
        />
      </div>

      <div className="flex items-center ">
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 pr-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          id="productsPerPage"
          value={productsPerPage}
          onChange={(e) => onProductsPerPageChange(parseInt(e.target.value))}
          className="p-2 pr-5 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <button className="bg-blue-500 ml-2 rounded-md p-2 text-white flex justify-items-center items-center">
          <MdOutlineAddToPhotos className="mr-1" />
          Thêm sản phẩm
        </button>
      </div>
    </div>
  );
}

export default ProductTableHeader;
