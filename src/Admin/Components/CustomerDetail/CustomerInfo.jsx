import React from 'react';
import { GiModernCity, GiPayMoney } from 'react-icons/gi';
import { IoCart } from 'react-icons/io5';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { formatPhoneNumber } from '../../../utils/FormatPhoneNumber';
import { FaAddressCard, FaCity, FaUserCheck } from 'react-icons/fa';
import { MdAttachEmail, MdOutlineContactPhone } from 'react-icons/md';
import { TbBuildingWarehouse } from 'react-icons/tb';

function CustomerInfo({ customerdata }) {
    return (
        <div className="bg-[#282941] p-4 mr-4 rounded-sm text-white">
            <div className="flex flex-col ">
                <div className="flex flex-col items-center">
                    <img
                        src={
                            customerdata.avatar
                                ? customerdata.avatar
                                : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'
                        }
                        alt="Customer"
                        className="rounded-md mb-4"
                    />
                    <strong>{customerdata.full_name}</strong>
                    <span>ID khách hàng: #{customerdata.id}</span>
                </div>

                <div className="flex mt-3 justify-between px-4 gap-4">
                    <div className="rounded-sm flex-1 flex items-end">
                        <div className="rounded-md w-12 h-12 bg-[#35365F] flex items-center justify-center">
                            <IoCart className="text-2xl text-[#696CFF]" />
                        </div>
                        <div className="pl-3">
                            <strong className="text text-xl text-white font-semibold">
                                {customerdata.quantity_order}
                            </strong>
                            <div className="flex items-center">
                                <span className="text text-sm text-white font-light">Hóa đơn</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm flex-1 flex items-end">
                        <div className="rounded-md w-12 h-12 bg-[#35365F] flex items-center justify-center">
                            <GiPayMoney className="text-2xl text-[#696CFF]" />
                        </div>
                        <div className="pl-3">
                            <strong className="text text-xl text-white font-semibold">
                                {customerdata.total_money
                                    ? formatCurrency(customerdata.total_money)
                                    : formatCurrency(0)}
                            </strong>
                            <div className="flex items-center">
                                <span className="text text-sm text-white font-light">Chi tiêu</span>
                            </div>
                        </div>
                    </div>
                </div>

                <strong className="text-xl mt-4 border-b-2">Chi tiết</strong>

                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-row gap-2 items-center">
                        <FaUserCheck />
                        <span>Username: {customerdata.username}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <MdAttachEmail />
                        <span>Email: {customerdata.email ? customerdata.email : 'Chưa có email'}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <MdOutlineContactPhone />
                        <span>
                            Số điện thoại:{' '}
                            {customerdata.phone ? formatPhoneNumber(customerdata.phone) : 'Chưa có số điện thoại'}
                        </span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <GiModernCity />
                        <span>{customerdata.province}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FaCity />
                        <span>{customerdata.district}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <TbBuildingWarehouse />
                        <span>{customerdata.ward}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FaAddressCard />
                        <span>Địa chỉ: {customerdata.address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerInfo;
