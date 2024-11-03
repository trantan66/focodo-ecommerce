import React from 'react';

function OrderContent(props) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    return (
        <div className="flex gap-3 px-5 my-3 ">
            <img src={props.img} alt="" className="w-20 h-20" />
            <div className="flex flex-col w-[100%]  ">
                <p className="">{props.name}</p>
                <div className="flex">
                    <p className="">x{props.quantity}</p>
                    <p className="ml-auto italic text-[13px]">{formatCurrency(props.price)}</p>
                </div>
            </div>
        </div>
    );
}

export default OrderContent;
