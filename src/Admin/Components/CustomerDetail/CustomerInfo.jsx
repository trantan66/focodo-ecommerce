import React from "react";
import { GiPayMoney } from "react-icons/gi";
import { IoCart } from "react-icons/io5";

function CustomerInfo({ customerdata }) {
  return (
    <div className="bg-[#282941] p-4 mr-4 rounded-sm text-white">
      {customerdata.map((items) => (
        <div className="flex flex-col ">
          <div className="flex flex-col items-center">
            <img
              src={items.image_link}
              alt="Customer"
              className="rounded-md mb-4"
            />
            <strong>{items.name}</strong>
            <span>ID khách hàng: #{items.id}</span>
          </div>

          <div className="flex mt-3 justify-between px-4 gap-4">
            <div className="rounded-sm flex-1 flex items-end">
              <div className="rounded-md w-12 h-12 bg-[#35365F] flex items-center justify-center">
                <IoCart className="text-2xl text-[#696CFF]" />
              </div>
              <div className="pl-3">
                <strong className="text text-xl text-white font-semibold">
                  {items.ordered}
                </strong>

                <div className="flex items-center">
                  <span className="text text-sm text-white font-light">
                    Hóa đơn
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-sm flex-1 flex items-end">
              <div className="rounded-md w-12 h-12 bg-[#35365F] flex items-center justify-center">
                <GiPayMoney className="text-2xl text-[#696CFF]" />
              </div>
              <div className="pl-3">
                <strong className="text text-xl text-white font-semibold">
                  đ{items.totalspent}
                </strong>

                <div className="flex items-center">
                  <span className="text text-sm text-white font-light">
                    Chi tiêu
                  </span>
                </div>
              </div>
            </div>
          </div>

          <strong className="text-xl mt-4 border-b-2">Chi tiết</strong>

          <div className="flex flex-col gap-4 mt-4">
            <span>Username: {items.username}</span>
            <span>Email: {items.email}</span>
            <div>
              <span>Trạng thái: </span>
              <span
                className={
                  items.status === "Hoạt động"
                    ? "capitalize py-1 px-2 rounded-md text-xs text-green-900 bg-green-300"
                    : ""
                }
              >
                {items.status}
              </span>
            </div>

            <span>Số điện thoại: {items.phonenumber}</span>
          </div>

          <button className="bg-blue-600 mt-4 rounded-md p-2">Cập nhật</button>
        </div>
      ))}
    </div>
  );
}

export default CustomerInfo;
