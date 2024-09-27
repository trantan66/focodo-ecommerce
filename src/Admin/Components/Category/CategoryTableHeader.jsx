import React from "react";
import { MdOutlineAddToPhotos } from "react-icons/md";

function CategoryTableHeader({
  searchTerm,
  onSearchChange,
  categoriesPerPage,
  onCategoriesPerPageChange,
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
          placeholder="Tìm kiếm danh mục"
        />
      </div>

      <div className="flex items-center ">
        <select
          id="productsPerPage"
          value={categoriesPerPage}
          onChange={(e) => onCategoriesPerPageChange(parseInt(e.target.value))}
          className="p-2 pr-5 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#282941] text-white"
        >
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <button className="bg-blue-500 ml-2 rounded-md p-2 text-white flex justify-items-center items-center">
          <MdOutlineAddToPhotos className="mr-1" />
          Thêm danh mục
        </button>

        {/* Dialog */}
      </div>
    </div>
  );
}

export default CategoryTableHeader;
