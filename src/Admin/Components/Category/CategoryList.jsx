import React, { useState } from "react";
import CategoryTableHeader from "./CategoryTableHeader";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const data = [];

function generateRandomProduct(index) {
  const categories = [
    "Toys",
    "Collectibles",
    "Puzzles",
    "Accessories",
    "Stationery",
    "Merchandise",
  ];

  const randomCategoryName =
    categories[Math.floor(Math.random() * categories.length)];
  const salePrice = Math.floor(Math.random() * (90000 - 20000 + 1)) + 20000;
  const quantity = Math.floor(Math.random() * 501);

  return {
    id: index,
    name: randomCategoryName,
    imagelink:
      "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    description: `${randomCategoryName} for fans of Doraemon.`,
    saleprice: Math.round(salePrice * 100),
    quantity: quantity,
  };
}

for (let i = 1; i <= 100; i++) {
  data.push(generateRandomProduct(i));
}

function CategoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 6;

  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesPerPage, setCategoriesPerPage] = useState(6);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;

  const filteredData = data.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCategories = filteredData.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   function openDialog(customer) {
//     setSelectedCategory(customer);
//     setIsOpen(true);
//   }

//   function closeDialog() {
//     setIsOpen(false);
//     setSelectedCategory(null);
//   }

//   function handleSubmit() {
//     // Xử lý gửi dữ liệu ở đây
//     console.log("Data submitted:", selectedCategory);
//     closeDialog();
//   }

  return (
    <div>
      <div className="mx-4 bg-[#282941] p-4 rounded-md  flex flex-col flex-1">
        <CategoryTableHeader
          dataCategory={data}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoriesPerPage={categoriesPerPage}
          onCategoriesPerPageChange={setCategoriesPerPage}
        />
        <div className="bg-[#282941] pt-3 pb-4 rounded-sm  flex-1">
          <strong className="text-white font-medium">Danh sách sản phẩm</strong>
          <div className="mt-3">
            <table className="w-full text-white border-x-gray-400">
              <thead>
                <tr className="bg-[#2E3044] h-10">
                  <td className="pl-2">Danh mục</td>
                  <td>Tổng sản phẩm</td>
                  <td>Thu nhập</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="h-[50vh]">
                {currentCategories.map((items, index) => (
                  <tr key={index} className="border-b-2">
                    <td>
                      <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                        <img
                          src={items.imagelink}
                          alt="Category"
                          className="w-10 h-10 rounded-sm object-cover"
                        />
                        <div className="pl-2">
                          <Link
                            to={`categorydetail/${items.id}`}
                            className="text text-sm font-semibold text-[#787BFF]"
                          >
                            {items.name}
                          </Link>
                          <div classN ame="flex items-center">
                            <strong className="text-xs text-white font-light">
                              {items.description}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{items.quantity}</td>
                    <td>đ{items.saleprice}</td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <Pagination
              showSizeChanger={false}
              current={currentPage}
              onChange={handlePageChange}
              total={data.length}
              pageSize={categoriesPerPage}
              className="custom-pagination"
            />
          </div>
        </div>
      </div>
      <div>.</div>
    </div>
  );
}

export default CategoryList;
