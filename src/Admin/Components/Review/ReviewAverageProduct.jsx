import { Pagination, Rate } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProductsFromAPI } from '../../../Services/ProductService';
import { Link } from 'react-router-dom';

function ReviewAverageProduct() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(6);
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

    const filteredData = useMemo(
        () => products.filter((product) => product.sold_quantity > 0),
        [products]
    );

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    return (
        <div className="text-white bg-[#282941] rounded-md flex-1">
            <div className="mx-4 bg-[#282941] p-4 rounded-md flex flex-col flex-1">
                <div className="bg-[#282941] pt-3 pb-4 rounded-sm flex-1">
                    <strong className="text-white font-medium">Danh sách đơn hàng</strong>
                    <div className="mt-3">
                        <table className="w-full text-white border-x-gray-400">
                            <thead>
                                <tr className="bg-[#2E3044] h-10">
                                    <td className="pl-2">Sản phẩm</td>
                                    <td>Trung bình đánh giá</td>
                                    <td>Số lượng đánh giá</td>
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
                                        <td>
                                            <Rate
                                                defaultValue={dataproduct.review}
                                                disabled={true}
                                                style={{ color: '#696CFF' }}
                                            />
                                        </td>
                                        <td>{dataproduct.sold_quantity}</td>
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
