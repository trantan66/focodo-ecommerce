import React, { useState } from 'react';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import products from '../Home/ListProduct/data';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import Rating from 'react-rating';
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

function Productlist(props) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate(`/productdetail`);
        console.log(`${props.id}`);
    };
    return (
        <div className="bg-[#F6F6F6] p-[15px]">
            {/* image */}
            <div className="">
                <img src={props.image} alt={props.Name} className="w-full h-[200px] object-cover" />
            </div>

            {/* Description */}
            <div className="text-[18px] font-semibold mt-[8px]">
                <p className="">{props.Name}</p>
            </div>
            <div className="flex mt-[8px]">
                <Rating
                    initialRating={props.rating}
                    emptySymbol={<StarOutlined className="text-yellow-500" />}
                    fullSymbol={<StarFilled className="text-yellow-500" />}
                    readonly
                />
            </div>
            {/* Price */}
            <div className="flex items-center mt-[8px] gap-2">
                <div>
                    <span className="text-[15px] font-bold text-red-500">{formatCurrency(props.salePrice)}</span>
                </div>
                <div>
                    <span className="text-[15px] text-gray-500 line-through">
                        {formatCurrency(props.OriginalPrice)}
                    </span>
                </div>
                <div className="flex items-center justify-center leading-[18px] h-[18px] p-[5px] bg-green-500 rounded-[8px]">
                    <span className="inline-block text-white font-bold text-[15px]">{props.Discount}%</span>
                </div>
            </div>

            {/* rating */}
            <div className="flex items-center mt-[10px]">
                <a
                    href=""
                    className="inline-block font-semibold text-[14px] px-[20px] py-[6px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black"
                >
                    Mua ngay
                </a>
            </div>
        </div>
    );
}

function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productsPerPage, setProductsPerPage] = useState(6);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const filterProducts = (products, value) => {
        if (value === 'Giá từ thấp đến cao') {
            return products.sort((a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice));
        }

        if (value === 'Giá từ cao đến thấp') {
            return products.sort((a, b) => parseFloat(b.salePrice) - parseFloat(a.salePrice));
        }

        if (value === 'Theo đánh giá') {
            return products.sort((a, b) => b.rating - a.rating);
        }

        return products;
    };
    const currentProducts = filterProducts(products, selectedCategory).slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="">
            <div className="flex ml-10">
                <span>Số lượng sản phẩm: </span>
                <span className="font-bold ml-1">85</span>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
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
                {currentProducts.map((item, index) => (
                    <Productlist
                        id={item.id}
                        key={item.id}
                        rating={item.rating}
                        image={item.image}
                        Name={item.Name}
                        salePrice={item.salePrice}
                        OriginalPrice={item.OriginalPrice}
                        Discount={item.Discount}
                    />
                ))}
            </div>
            <div className="mt-5">
                <Pagination
                    showSizeChanger={false}
                    current={currentPage}
                    onChange={handlePageChange}
                    total={products.length}
                    pageSize={productsPerPage}
                    className="flex justify-center items-center"
                />
            </div>
        </div>
    );
}

export default ProductList;
