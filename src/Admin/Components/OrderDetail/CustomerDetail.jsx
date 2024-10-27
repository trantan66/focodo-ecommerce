import React from 'react';
import { TbShoppingCartCheck } from 'react-icons/tb';
import { Link } from 'react-router-dom';

function CustomerDetail({ data }) {
    return (
        <div className="bg-[#282941] pt-3 pb-4 mb-2 rounded-sm text-white">
            <strong className="px-4 text-xl">Chi tiết khách hàng</strong>
            {data && (
                <div className="flex flex-col px-4 gap-3 mt-2">
                    <div className="rounded-sm flex-1 flex items-center">
                        <img
                            src={
                                'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'
                            }
                            alt="Customer"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="pl-2">
                            <Link
                                to={`/admin/customer/customerdetail/${data.id}`}
                                className="text text-sm font-semibold text-[#787BFF]"
                            >
                                {data.full_name}
                            </Link>
                            <div className="flex items-center">
                                <strong className="text-xs text-white font-light">ID khách hàng: #{data.id}</strong>
                            </div>
                        </div>
                    </div>

                    <div className=" rounded-sm flex-1 flex items-center gap-x-2">
                        <div className="rounded-full w-12 h-12 bg-[#36483F] flex items-center justify-center">
                            <TbShoppingCartCheck className="text-2xl text-[#71DD37]" />
                        </div>
                        <span>{''} đơn hàng</span>
                    </div>

                    <div className="flex flex-col">
                        <strong>Thông tin liên hệ</strong>
                        <span>Username: {data.username}</span>
                        <span>Số điện thoại: {data.phone}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerDetail;
