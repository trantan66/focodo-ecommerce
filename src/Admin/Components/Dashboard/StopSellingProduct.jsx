import React, { useEffect, useState } from 'react';
import { MdOutlineStopScreenShare } from 'react-icons/md';
import { fetchQuantityProductInActive } from '../../../Services/DashboardService';

function StopSellingProduct() {
  const [products, setProduct] = useState(0);
  useEffect(() => {
      const fetchProduct = async () => {
          try {
              const { data } = await fetchQuantityProductInActive();
              setProduct(data);
          } catch (error) {
              console.error('Lỗi khi lấy sản phẩm:', error);
          }
      };
      fetchProduct();
  }, []);
    return (
        <div className="bg-[#282941] p-4 rounded-sm h-2/6 flex flex-row gap-4 items-center">
            <div className="bg-[#4D2E3A] p-2 rounded-md text-[#FF3E1D] text-2xl">
                <MdOutlineStopScreenShare />
            </div>
            <div className="flex flex-col">
                <span className="text-gray-400 text-md">Sản phẩm dừng bán</span>
                <span className="text-white text-2xl">{products}</span>
            </div>
        </div>
    );
}

export default StopSellingProduct;
