import { useState } from 'react';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Tabs } from 'antd';
import products from './data'; // Import file data.js
import ProductCard from './ProductCard';

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
        },
    ];

    // Hàm xử lý khi nhấn nút "Xem thêm"
    const showMoreProducts = () => {
        setVisibleProducts((prevVisible) => prevVisible + 4); // Hiển thị thêm 4 sản phẩm
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
                    {products.slice(0, visibleProducts).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Điều kiện hiển thị nút "Xem thêm" hoặc "Ẩn bớt" */}
            <div className="flex justify-center mt-[20px]">
                {visibleProducts < products.length ? (
                    <button
                        onClick={showMoreProducts}
                        className="inline-block font-semibold text-[16px] px-[30px] py-[10px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black"
                    >
                        Xem thêm
                    </button>
                ) : (
                    <button
                        onClick={showLessProducts}
                        className="inline-block font-semibold text-[16px] px-[30px] py-[10px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black"
                    >
                        Ẩn bớt
                    </button>
                )}
            </div>
        </>
    );
}

export default ListProduct;
