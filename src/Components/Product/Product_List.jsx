import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pagination } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import Rating from 'react-rating';
import { fetchAllProduct, fetchProductsByCategoryFromAPI, fetchProductsFromAPI } from '../../Services/ProductService';
import Filter from './Filter';
import ProductCard from '../Shared/ProductCard';

const ArrangeFilter = [
    {
        key: 'ByRating',
        value: 'Theo đánh giá',
    },
    {
        key: 'Ascending',
        value: 'Giá từ thấp đến cao',
    },
    {
        key: 'Descending',
        value: 'Giá từ cao đến thấp',
    },
];

function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [productsPerPage, setProductsPerPage] = useState(6);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState({});
    const { categoryId = 1 } = useParams();
    const [sortOrder, setSortOrder] = useState('');
    const fetchProducts = useCallback(async () => {
        try {
            const { data, total } = await fetchProductsByCategoryFromAPI(categoryId, currentPage, productsPerPage);
            setProducts(data);
            setTotalProducts(total);
            console.log(data);
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    }, [currentPage, productsPerPage]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const sortedProducts = useMemo(() => {
        if (!sortOrder) return products;

        return [...products].sort((a, b) => {
            const reviewA = parseFloat(a.review);
            const reviewB = parseFloat(b.review);

            // Xử lý các giá trị không hợp lệ
            if (isNaN(reviewA) && isNaN(reviewB)) return 0; // Cả hai đều không hợp lệ
            if (isNaN(reviewA)) return 1; // a không hợp lệ, đưa xuống cuối
            if (isNaN(reviewB)) return -1; // b không hợp lệ, đưa xuống cuối
            if (sortOrder === 'Theo đánh giá') {
                return reviewB - reviewA;
            }
            if (sortOrder === 'Giá từ thấp đến cao') {
                return a.sell_price - b.sell_price;
            }
            if (sortOrder === 'Giá từ cao đến thấp') {
                return b.sell_price - a.sell_price;
            }
            return 0;
        });
    }, [products, sortOrder]);
    // const filteredData = useMemo(
    //     () =>
    //         Array.isArray(products)
    //             ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    //             : [],
    //     [products, searchTerm],
    // );

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handleProductsPerPageChange = useCallback((value) => {
        setProductsPerPage(value);
    }, []);

    // useEffect(() => {
    //     console.log('Sorted Products:', sortedProducts);
    // }, [sortedProducts]);
    return (
        <div className="flex justify-center mx-auto my-4 w-[1200px]">
            <Filter />
            <div className="">
                <div className="flex ml-10">
                    <span>Số lượng sản phẩm: </span>
                    <span className="font-bold ml-1">{totalProducts}</span>

                    <select
                        // value={selectedCategory}
                        // onChange={(e) => setSelectedCategory(e.target.value)}
                        value={sortOrder}
                        onChange={(e) => {
                            setSortOrder(e.target.value);
                        }}
                        className="border border-gray-300 p-2 rounded ml-auto"
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
                    {products.length > 0 ? (
                        sortedProducts.map((item, index) => (
                            <div key={index}>
                                <ProductCard product={item} />
                            </div>
                        ))
                    ) : (
                        <span className=" text-2xl ">Không có sản phẩm nào </span>
                    )}
                </div>
                <div className="mt-5  ">
                    {totalProducts > productsPerPage ? (
                        <Pagination
                            showSizeChanger={false}
                            current={currentPage}
                            onChange={handlePageChange}
                            total={totalProducts}
                            pageSize={productsPerPage}
                            align="center"
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductList;
