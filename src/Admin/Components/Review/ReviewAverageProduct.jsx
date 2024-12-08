import { Pagination } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchProductsFromAPI } from '../../../Services/ProductService';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { StarFilled, StarOutlined } from '@ant-design/icons';

function ReviewAverageProduct() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;
    const [totalProducts, setTotalProducts] = useState(0);
    const [cachedProducts, setCachedProducts] = useState({});
    const fetchProducts = useCallback(async () => {
        const cacheKey = `${currentPage}-${productsPerPage}`;

        if (cachedProducts[cacheKey]) {
            setProducts(cachedProducts[cacheKey]);
        } else {
            try {
                const { data, total } = await fetchProductsFromAPI(currentPage, productsPerPage);
                setProducts(data);
                setTotalProducts(total);

                setCachedProducts((prev) => ({
                    ...prev,
                    [cacheKey]: data,
                }));
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        }
    }, [currentPage, productsPerPage, cachedProducts]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    return (
        <div className="text-white bg-[#282941] rounded-md flex-1">
            <div className="mx-4 bg-[#282941] p-4 rounded-md flex flex-col flex-1">
                <div className="bg-[#282941] pt-3 pb-4 rounded-sm flex-1">
                    <strong className="text-white font-medium">Đánh giá trung bình sản phẩm</strong>
                    <div className="mt-3">
                        <table className="w-full text-white border-x-gray-400">
                            <thead>
                                <tr className="bg-[#2E3044] h-10">
                                    <td>Sản phẩm</td>
                                    <td>Trung bình đánh giá</td>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((dataproduct, index) => (
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
                                                        to={`/admin/product/productdetail/${dataproduct.id}`}
                                                        className="text text-sm font-semibold text-[#787BFF]"
                                                    >
                                                        {dataproduct.name}
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <Rating
                                                initialRating={dataproduct.review}
                                                emptySymbol={<StarOutlined className="text-[#696CFF] text-2xl" />}
                                                fullSymbol={<StarFilled className="text-[#696CFF] text-2xl" />}
                                                readonly
                                            />
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
        </div>
    );
}

export default ReviewAverageProduct;
