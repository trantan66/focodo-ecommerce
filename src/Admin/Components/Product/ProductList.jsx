import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Pagination } from "antd";
import ProductTableHeader from "./ProductTableHeader";
import "../CustomCss/CustomPagination.css";
import {
  fetchProductsFromAPI,
} from "../../../Services/ProductService";
import { fetchAllCategoriesFromAPI } from "../../../Services/CategoryService";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [totalProducts, setTotalProducts] = useState(0);
  const [cachedProducts, setCachedProducts] = useState({});

  const [categories, setCategories] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await fetchAllCategoriesFromAPI();
        const filteredCategories = data.filter(
          (category) => category.id !== 1 && category.id !== 2
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    const cacheKey = `${currentPage}-${productsPerPage}`;

    if (cachedProducts[cacheKey]) {
      setProducts(cachedProducts[cacheKey]);
    } else {
      try {
        const { data, total } = await fetchProductsFromAPI(
          currentPage,
          productsPerPage
        );
        setProducts(data);
        setTotalProducts(total);

        setCachedProducts((prev) => ({
          ...prev,
          [cacheKey]: data,
        }));
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    }
  }, [currentPage, productsPerPage, cachedProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredData = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleProductsPerPageChange = useCallback((value) => {
    setProductsPerPage(value);
  }, []);

  return (
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
                <td>Đã bán</td>
                <td>Giá gốc</td>
                <td>Giảm giá</td>
                <td>Giá bán</td>
                <td>Số lượng</td>
              </tr>
            </thead>
            <tbody className="h-[50vh]">
              {filteredData.map((dataproduct, index) => (
                <tr key={index} className="border-b-2">
                  <td>
                    <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                      <img
                        src={dataproduct.image}
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
                  <td>{dataproduct.sold_quantity}</td>
                  <td>{dataproduct.original_price} đ</td>
                  <td>{(dataproduct.discount * 100).toFixed(0)}%</td>
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
  );
}

export default ProductList;
