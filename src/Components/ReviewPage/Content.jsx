import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import { Product_Items } from '../Product/Product_Items';

function Content() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    return (
        <div className="flex flex-col ">
            <ReviewCard
                name={Product_Items[0].name}
                img={Product_Items[0].image}
                price={formatCurrency(Product_Items[0].saleprice)}
                subcription={Product_Items[0].subcription}
            ></ReviewCard>
            <ReviewCard
                name={Product_Items[1].name}
                img={Product_Items[1].image}
                price={formatCurrency(Product_Items[1].saleprice)}
                subcription={Product_Items[1].subcription}
            ></ReviewCard>
            <div className="flex mx-auto gap-3 mr-3 my-4">
                <button className=" bg-[#FAF7F0] text-black border border-black w-[150px] h-[50px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 ">
                    TRỞ LẠI
                </button>
                <button className="bg-black text-white w-[150px] h-[50px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4">
                    HOÀN THÀNH
                </button>
            </div>
        </div>
    );
}

export default Content;
