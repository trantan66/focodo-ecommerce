import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Pagination } from "antd";
import axios from "axios";
import ProductTableHeader from "./ProductTableHeader";
import "../CustomCss/CustomPagination.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);

  const [cachedProducts, setCachedProducts] = useState({});

  const categories = [
    "Toys",
    "Collectibles",
    "Puzzles",
    "Accessories",
    "Stationery",
    "Merchandise",
  ];
  // const randomCategoryName =
  //   categories[Math.floor(Math.random() * categories.length)];

  // const fetchProducts = useCallback(async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/v1/products?page=${
  //         currentPage - 1
  //       }&size=${productsPerPage}`
  //     );
  //     setProducts(response.data.result.data);
  //     setTotalProducts(response.data.result.pagination.total_records);
  //   } catch (error) {
  //     console.error("Error fetching the products:", error);
  //   }
  // }, [currentPage, productsPerPage]);

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);
 
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products?page=${currentPage - 1}&size=${productsPerPage}`
      );
      setProducts(response.data.result.data);
      setTotalProducts(response.data.result.pagination.total_records);
    
      setCachedProducts((prev) => ({
        ...prev,
        [currentPage]: response.data.result.data,
      }));
    } catch (error) {
      console.error("Error fetching the products:", error);
    }
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    if (cachedProducts[currentPage]) {
      setProducts(cachedProducts[currentPage]);
    } else {
      fetchProducts();
    }
  }, [currentPage, fetchProducts, cachedProducts]);

  const filteredData = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategory === "" || categories.includes(selectedCategory)
    );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProductsPerPageChange = (value) => {
    setProductsPerPage(value);
  };

  return (
    <div>
      <div className="mx-4 bg-[#282941] p-4 rounded-md flex flex-col flex-1">
        <ProductTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          productsPerPage={productsPerPage}
          onProductsPerPageChange={handleProductsPerPageChange}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        <div className="bg-[#282941] pt-3 pb-4 rounded-sm flex-1">
          <strong className="text-white font-medium">Danh sách sản phẩm</strong>
          <div className="mt-3">
            <table className="w-full text-white border-x-gray-400">
              <thead>
                <tr className="bg-[#2E3044] h-10">
                  <td className="pl-2">Sản phẩm</td>
                  <td>Danh mục</td>
                  <td>Giá gốc</td>
                  <td>Giảm giá</td>
                  <td>Giá bán</td>
                  <td>Số lượng</td>
                  <td>Số lượng / gói</td>
                </tr>
              </thead>
              <tbody className="h-[50vh]">
                {filteredData.map((dataproduct, index) => (
                  <tr key={index} className="border-b-2">
                    <td>
                      <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                        <img
                          src={dataproduct.images[0]}
                          alt="Product"
                          className="w-10 h-10 rounded-sm object-cover"
                        />
                        <div className="pl-2">
                          <Link
                            to={`productdetail/${dataproduct.id}`}
                            className="text text-sm font-semibold text-[#787BFF]"
                          >
                            {dataproduct.name}
                          </Link>
                          <div className="flex items-center">
                            <strong className="text-xs text-white font-light">
                              {dataproduct.sub_description}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                        <img
                          src="https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg"
                          alt="Category"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="pl-2">
                          <Link
                            to={`category/categorydetail/${categories[0]}`}
                            className="text text-sm font-semibold text-[#787BFF]"
                          >
                            {categories[0]}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>{dataproduct.original_price} đ</td>
                    <td>{dataproduct.discount * 100}%</td>
                    <td>{dataproduct.sell_price} đ</td>
                    <td>
                      <span
                        className={classNames(
                          dataproduct.quantity === 0
                            ? "capitalize py-1 px-2 rounded-md text-xs bg-red-300 text-red-500"
                            : dataproduct.quantity > 50
                            ? "capitalize py-1 px-2 rounded-md text-xs bg-green-200 text-green-800"
                            : "capitalize py-1 px-2 rounded-md text-xs bg-amber-100 text-amber-400",
                          "text-xs font-medium"
                        )}
                      >
                        {dataproduct.quantity === 0
                          ? "Hết hàng"
                          : dataproduct.quantity}
                      </span>
                    </td>
                    <td>{dataproduct.package_quantity} cái / gói</td>

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
              total={totalProducts}
              pageSize={productsPerPage}
              className="custom-pagination"
            />
          </div>
        </div>
      </div>
      <div>.</div>
    </div>
  );
}

export default ProductList;
