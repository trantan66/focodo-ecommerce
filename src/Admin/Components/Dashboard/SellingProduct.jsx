import React, { useEffect, useState } from 'react';
import { LiaSellcast } from 'react-icons/lia';
import { fetchQuantityProductActive } from '../../../Services/DashboardService';

function SellingProduct() {
    const [products, setProduct] = useState(0);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await fetchQuantityProductActive();
                setProduct(data);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        fetchProduct();
    }, []);
    return (
        <div className="bg-[#282941] p-4 rounded-sm h-2/6 flex flex-row gap-4 items-center">
            <div className="bg-[#36473E] p-2 rounded-md text-[#71DD37] text-2xl">
                <LiaSellcast />
            </div>
            <div className="flex flex-col">
                <span className="text-gray-400 text-md">Sản phẩm đang bán</span>
                <span className="text-white text-2xl">{products}</span>
            </div>
        </div>
    );
}

export default SellingProduct;
