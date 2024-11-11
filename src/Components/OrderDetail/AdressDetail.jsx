import React from 'react';

function AdressDetail(props) {
    return (
        <div className="flex flex-col px-5 mb-4">
            <div className="flex ml-auto mt-1">
                <span className="mr-2">Mã đơn hàng: {props.id} </span>
                <span className="">|</span>
                <span className="ml-2 text-red-500">Tình trạng: {props.status}</span>
            </div>
            <p className="text-[20px] font-semibold italic mb-2">Địa chỉ nhận hàng</p>
            <p className="my-2">{props.name}</p>
            <div className="opacity-[80%]">
                <p className="text-[13px] italic">{props.number}</p>
                <p className="text-[13px] italic">
                    {props.address} {props.ward} {props.district} {props.province}
                </p>
            </div>
            <span className="text-[20px] font-semibold italic my-2">Ngày đặt hàng: {props.date}</span>
        </div>
    );
}

export default AdressDetail;
