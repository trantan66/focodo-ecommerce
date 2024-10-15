import { useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { Tabs } from "antd";
import products from './data'; // Import file data.js

function ListProduct() {
    const [visibleProducts, setVisibleProducts] = useState(8); // Mặc định hiển thị 8 sản phẩm

    const items = [
        {
            key: '1',
            label: 'Bán chạy',
        },
        {
            key: '2',
            label: 'Khuyến mãi',
        }
    ];

    // Định nghĩa hàm formatCurrency ở cấp độ của ListProduct
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Hàm xử lý khi nhấn nút "Xem thêm"
    const showMoreProducts = () => {
        setVisibleProducts(prevVisible => prevVisible + 4); // Hiển thị thêm 4 sản phẩm
    };

    // Hàm xử lý khi nhấn nút "Ẩn bớt"
    const showLessProducts = () => {
        setVisibleProducts(8); // Quay lại hiển thị 8 sản phẩm ban đầu
    };

    return (
        <>
            <div className="mt-[100px] mb-[20px] flex justify-center items-center">
                <div className="w-[1200px] h-[40px]">
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>

            <div className="w-full h-auto flex justify-center items-center">
                <div className="grid grid-cols-4 gap-4 w-[1200px]">
                    {/* Hiển thị số lượng sản phẩm dựa trên visibleProducts */}
                    {products.slice(0, visibleProducts).map(product => (
                        <div key={product.id} className="w-[268px] h-[350px] bg-red-500 flex flex-col items-center" style={{ backgroundColor: '#F6F6F6' }}>
                            {/* image */}
                            <div className="w-[245px] h-[220px] mt-[12px]">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Description */}
                            <div className="w-[225px] mt-[5px]">
                                <p className="font-medium text-lg">{product.Name}</p>
                            </div>

                            {/* Price */}
                            <div className="grid grid-cols-3 gap-4 p-3">
                                <div className="flex flex-col items-center">
                                    <span className="text-lg font-bold text-red-600">{formatCurrency(product.salePrice)}</span>
                                    <span className="text-sm text-gray-600"></span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-gray-500 line-through">{formatCurrency(product.OriginalPrice)}</span>
                                    <span className="text-sm text-gray-600"></span>
                                </div>
                               
                                <div className="flex flex-col items-center">
                                    <span className="text-green-600 font-bold">{product.Discount}%</span>
                                    <span className="text-sm text-gray-600"></span>
                                </div>
                            </div>

                            {/* rating */}
                            <div className="flex mt-[]">
                                {[...Array(5)].map((_, index) => (
                                    index < product.rating ? (
                                        <StarFilled key={index} className="text-yellow-500" />
                                    ) : (
                                        <StarOutlined key={index} className="text-yellow-500" />
                                    )
                                ))}
                            </div>

                            
                        </div>
                    ))}
                </div>
            </div>

            {/* Điều kiện hiển thị nút "Xem thêm" hoặc "Ẩn bớt" */}
            <div className="flex justify-center mt-[20px]">
                {visibleProducts < products.length ? (
                    <button
                        onClick={showMoreProducts}
                        className="w-[200px] h-[50px] bg-blue-500 text-white text-center rounded">
                        Xem thêm
                    </button>
                ) : (
                    <button
                        onClick={showLessProducts}
                        className="w-[200px] h-[50px] bg-red-500 text-white text-center rounded">
                        Ẩn bớt
                    </button>
                )}
            </div>
        </>
    );
}

export default ListProduct;
