import React from 'react';

function AdressDetail(props) {
    return (
        <div className="flex flex-col px-5 mb-4">
            <div className="flex ml-auto mt-1">
                <span className="mr-2">Mã đơn hàng: {props.id} </span>
                <span className="">|</span>
                <span className="ml-2 text-red-500">Tình trạng: {props.status}</span>
            </div>
            <p className="text-[20px] font-semibold italic mb-2">Thông tin nhận hàng</p>
            {props.name && <p>Người nhận: {props.name}</p>}
            {props.number && <p>Số điện thoại: {props.number}</p>}
            {props.address && <p>Địa chỉ: {props.address}</p>}
            {props.ward && <p>Phường/xã: {props.ward}</p>}
            {props.district && <p>Quận/huyện: {props.district}</p>}
            {props.province && <p>Tỉnh/thành phố: {props.province}</p>}
            <span className="text-[20px] font-semibold italic my-2">Ngày đặt hàng: {props.date}</span>
        </div>
    );
}

export default AdressDetail;
