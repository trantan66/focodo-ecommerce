import React from "react";
import { useParams } from "react-router-dom";

function CustomerHeader({ customerdata }) {
  const { customerId } = useParams();
  return (
    <div className="rounded-md flex flex-row justify-between flex-1 pr-4">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <span className="text-white text-3xl pr-2">
            Khách hàng ID #{customerId}
          </span>
          {customerdata.map((items) => (
            <span className="text-gray-400">{items.order_datetime}</span>
          ))}
          {customerdata.map((items) => (
            <span className="text-gray-400">{items.registered_date}</span>
          ))}
        </div>
      </div>
      <button className="text-red-500  bg-[#4D2F3A] px-6 mb-3 rounded-md hover:bg-red-800">
        Xóa đơn hàng
      </button>
    </div>
  );
}

export default CustomerHeader;
