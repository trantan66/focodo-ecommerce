import React from 'react';

function AdressDetail(props) {
    return (
        <div className='px-5 mb-4'>
            <p className="text-[20px] font-semibold italic mb-4">Địa chỉ nhận hàng</p>
            <p className="my-2">{props.name}</p>
            <div className="opacity-[80%]">
                <p className="text-[13px] italic">{props.number}</p>
                <p className="text-[13px] italic">
                    {props.address}, {props.ward}, {props.district}, {props.province}
                </p>
            </div>
        </div>
    );
}

export default AdressDetail;
