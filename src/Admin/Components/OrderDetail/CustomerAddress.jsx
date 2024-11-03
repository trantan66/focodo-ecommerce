import React from 'react';

function CustomerAddress({ data }) {
    return (
        <div className="bg-[#282941] pt-3 pb-4 rounded-sm text-white">
            <strong className="px-4 text-xl">Thông tin giao hàng</strong>
            {data && (
                <div className="flex flex-col gap-4 px-4 pt-3">
                    <span>Địa chỉ : {data.address}</span>
                </div>
            )}
        </div>
    );
}

export default CustomerAddress;
