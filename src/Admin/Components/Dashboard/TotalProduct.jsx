import React, { useEffect, useState } from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { fetchTotalProduct } from '../../../Services/DashboardService';

function TotalProduct() {
    const [products, setProduct] = useState(0);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await fetchTotalProduct();
                setProduct(data);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        fetchProduct();
    }, []);
    return (
        <div className="bg-[#282941] p-4 rounded-sm h-2/6 flex flex-row gap-4 items-center">
            <div className="bg-[#35355E] p-2 rounded-md text-[#696CFF] text-2xl">
                <AiOutlineProduct />
            </div>
            <div className="flex flex-col">
                <span className="text-gray-400 text-md">Tổng sản phẩm</span>
                <span className="text-white text-2xl">{products}</span>
            </div>
        </div>
    );
}

export default TotalProduct;
