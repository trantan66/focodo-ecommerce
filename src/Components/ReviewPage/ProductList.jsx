import React from 'react';

function ProductList(props) {
    return (
        <div className="flex my-2 gap-3">
            <img src={props.img} alt="" className="w-[10%] h-[75px]" />
            <div className="w-[90%]">
            <div className="flex">
            <span className="text-[17px] font-semibold">{props.name}</span>
            <span className="ml-auto mr-3 italic font-semibold text-red-500 ">{props.price}</span>
            </div>
            <p className="text-[12px] opacity-75 italic w-[60%]">{props.subcription}</p>
            </div>
        </div>
    );
}

export default ProductList;
