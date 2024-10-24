import React from 'react';

function Address(props) {
    return (
        <div className="my-3 pb-3 border-b border-gray-300">
            <div className="flex gap-3">
                <p className=" text-[16px] border-r pr-3 border-black">{props.name}</p>
                <p className="text-[14px] mt-0.5">{props.number}</p>
                <p className="text-[14px] ml-auto text-blue-600 hover:text-orange-500">Cập nhật</p>
            </div>
            <p className="">{props.address} </p>
            <div className="">
                <span className="text-[14px] mr-1">{props.ward},</span>
                <span className="text-[14px] mr-1">{props.district},</span>
                <span className="text-[14px]">{props.province}</span>
            </div>
        </div>
    );
}

export default Address;
