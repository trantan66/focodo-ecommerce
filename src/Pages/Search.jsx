import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../Services/ProductService';
import ProductCard from '../Components/Shared/ProductCard';
import { Pagination } from 'antd';

const Search = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [loading, setLoading] = useState(false);

    const handleChangePage = (pageNumber) => {
        setPage(pageNumber);
    };

    useEffect(() => {
        fetchProductsSearching();
    }, [page]);

    const [totalRecods, setTotalRecods] = useState();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProductsSearching();
    }, [query]);

    const fetchProductsSearching = async () => {
        setLoading(true);
        const response = await searchProducts(query, page - 1, pageSize);
        console.log(response);
        if (response.code == 0) {
            setTotalRecods(response.result.pagination && response.result.pagination.total_records);
            setProducts(response.result.data);
            setLoading(false);
        }
    };

    return (
        query &&
        loading == false && (
            <div className="max-w-[1200px] mx-auto px-[15px] mb-[20px]">
                <ul className="flex items-center py-[10px] text-[14px]">
                    <li>
                        <a href="/" className="hover:no-underline">
                            Trang chủ
                        </a>
                    </li>
                    <li className="before:px-[8px] before:text-[#ccc] before:content-['/\00a0']">
                        <span>Tìm kiếm</span>
                    </li>
                </ul>

                <h1 className="mb-[13px] mt-[30px] text-center text-[36px]">Tìm kiếm</h1>
                <p className="mb-[25px] text-[14px]">
                    Kết quả tìm kiếm cho "<strong>{query}</strong>"
                </p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="mt-5">
                    <Pagination
                        showSizeChanger={false}
                        current={page}
                        onChange={handleChangePage}
                        total={totalRecods}
                        pageSize={pageSize}
                        className="flex justify-center items-center"
                    />
                </div>
            </div>
        )
    );
};

export default Search;
