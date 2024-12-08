import React from 'react';
import { FaAddressCard, FaCity, FaUserCheck } from 'react-icons/fa';
import { GiModernCity } from 'react-icons/gi';
import { MdOutlineContactPhone } from 'react-icons/md';
import { TbBuildingWarehouse } from 'react-icons/tb';

function CustomerAddress({ data }) {
    return (
        <div className="bg-[#282941] pt-3 pb-4 rounded-sm text-white">
            <strong className="px-4 text-xl">Thông tin giao hàng</strong>
            {data && (
                <div className="flex flex-col gap-4 px-4 pt-3 text-gray-300">
                    <div className="flex flex-row gap-2 items-center">
                        <FaUserCheck />
                        <span>Tên khách hàng: {data.full_name}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <MdOutlineContactPhone />
                        <span>Số điện thoại: {data.phone}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <GiModernCity />
                        <span>{data.province}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FaCity />
                        <span>{data.district}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <TbBuildingWarehouse />
                        <span>{data.ward}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FaAddressCard />
                        <span>Địa chỉ : {data.address}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerAddress;
