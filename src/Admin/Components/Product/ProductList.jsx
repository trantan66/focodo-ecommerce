import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Pagination } from "antd";
import ProductTableHeader from "./ProductTableHeader";

const data = [];

function generateRandomProduct(index) {
  const productNames = [
    "Plush Toy",
    "Action Figure",
    "Puzzle Set",
    "Keychain",
    "Notebook",
    "Mug",
    "Pen",
  ];
  const categories = [
    "Toys",
    "Collectibles",
    "Puzzles",
    "Accessories",
    "Stationery",
    "Merchandise",
  ];

  const randomProductName = `Doraemon ${
    productNames[Math.floor(Math.random() * productNames.length)]
  } ${index}`;
  const randomCategoryName =
    categories[Math.floor(Math.random() * categories.length)];

  const originalPrice = Math.floor(Math.random() * (90000 - 20000 + 1)) + 20000;
  const discount = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  const salePrice = originalPrice * (1 - discount / 100);
  const quantity = Math.floor(Math.random() * 501);

  return {
    product: {
      name: randomProductName,
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: `A unique ${randomProductName.toLowerCase()} featuring Doraemon.`,
    },
    category: {
      name: randomCategoryName,
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: `${randomCategoryName} for fans of Doraemon.`,
    },
    originalprice: originalPrice,
    discount: discount,
    saleprice: Math.round(salePrice * 100) / 100,
    quantity: quantity,
  };
}

for (let i = 1; i <= 100; i++) {
  data.push(generateRandomProduct(i));
}

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 6;

  const [searchTerm, setSearchTerm] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(6);

  const [selectedCategory, setSelectedCategory] = useState("");

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const categories = [...new Set(data.map((product) => product.category.name))];

  const filteredData = data
    .filter((product) =>
      product.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategory === "" || product.category.name === selectedCategory
    );

  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="m-4 bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <ProductTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        productsPerPage={productsPerPage}
        onProductsPerPageChange={setProductsPerPage}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <strong className="text-gray-700 font-medium">
          Danh sách sản phẩm
        </strong>
        <div className="mt-3">
          <table className="w-full text-gray-700 border-x-gray-400">
            <thead>
              <tr className="bg-[#FAFAFA] h-10">
                <td>Sản phẩm</td>
                <td>Danh mục</td>
                <td>Giá gốc</td>
                <td>Discount</td>
                <td>Giá bán</td>
                <td>Số lượng</td>
              </tr>
            </thead>
            <tbody className="h-[50vh]">
              {currentProducts.map((dataproduct, index) => (
                <tr key={index} className="border-b-2">
                  <td>
                    <div className="bg-white rounded-sm flex-1 flex items-center">
                      <img
                        src={dataproduct.product.imagelink}
                        alt="Product"
                        className="w-10 h-10 rounded-sm object-cover"
                      />
                      <div className="pl-2">
                        <Link
                          to={`productdetail/${dataproduct.product.name}`}
                          className="text text-sm font-semibold text-[#787BFF]"
                        >
                          {dataproduct.product.name}
                        </Link>
                        <div classN ame="flex items-center">
                          <strong className="text-xs text-gray-700 font-light">
                            {dataproduct.product.description}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="bg-white rounded-sm flex-1 flex items-center">
                      <img
                        src={dataproduct.category.imagelink}
                        alt="Category"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="pl-2">
                        <Link
                          to={`category/categorydetail/${dataproduct.category.name}`}
                          className="text text-sm font-semibold text-[#787BFF]"
                        >
                          {dataproduct.category.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>{dataproduct.originalprice} đ</td>
                  <td>{dataproduct.discount}%</td>
                  <td>{dataproduct.saleprice} đ</td>
                  <td>
                    <span
                      className={classNames(
                        dataproduct.quantity === 0
                          ? "capitalize py-1 px-2 rounded-md text-xs bg-red-300 text-red-500"
                          : dataproduct.quantity > 50
                          ? "capitalize py-1 px-2 rounded-md text-xs bg-green-300 text-green-500"
                          : "capitalize py-1 px-2 rounded-md text-xs bg-amber-100 text-amber-300",
                        "text-xs font-medium"
                      )}
                    >
                      {dataproduct.quantity === 0
                        ? "Hết hàng"
                        : dataproduct.quantity}
                    </span>
                  </td>
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
            pageSize={productsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
