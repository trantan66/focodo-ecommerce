import React from 'react';
import { useParams } from 'react-router-dom';

function CustomerHeader({ customerdata }) {
    const { customerId } = useParams();
    return (
        <div className="rounded-md flex flex-row justify-between flex-1 pr-4">
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <span className="text-white text-3xl pr-2">Khách hàng ID #{customerId}</span>
                    <span className="text-gray-400">
                        {customerdata.created_date ? customerdata.created_date : 'Chưa tạo tài khoản'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CustomerHeader;
