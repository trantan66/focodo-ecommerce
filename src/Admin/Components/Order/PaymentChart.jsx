import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { TbShoppingCartCancel } from "react-icons/tb";

function PaymentChart() {
  return (
    <div className="flex gap-4 w-full px-4">
      <div className="bg-[#282941] rounded-sm p-4 flex-1 flex items-center justify-between border-r-2">
        <div className="pr-4">
          <div className="flex items-center">
            <h2 className="text text-xl text-white font-semibold mb-1">
              34.500
            </h2>
          </div>
          <span className="text text-sm text-white font-light">
            Tổng hóa đơn
          </span>
        </div>
        <div className="rounded-md w-12 h-12 bg-cyan-500 flex items-center justify-center">
          <MdPayment className="text-2xl text-white" />
        </div>
      </div>

      <div className="bg-[#282941] rounded-sm p-4 flex-1 flex items-center justify-between border-r-2">
        <div className="pr-4">
          <div className="flex items-center">
            <h2 className="text text-xl text-white font-semibold mb-1">
              30.120
            </h2>
          </div>
          <span className="text text-sm text-white font-light">
            Đã thanh toán
          </span>
        </div>
        <div className="rounded-md w-12 h-12 bg-[#6BCF37] flex items-center justify-center">
          <BsCalendar2CheckFill className="text-2xl text-white" />
        </div>
      </div>

      <div className="bg-[#282941] rounded-sm p-4 flex-1 flex items-center justify-between border-r-2">
        <div className="pr-4">
          <div className="flex items-center">
            <h2 className="text text-xl text-white font-semibold mb-1">
              2.450
            </h2>
          </div>
          <span className="text text-sm text-white font-light">
            Chưa thanh toán
          </span>
        </div>
        <div className="rounded-md w-12 h-12 bg-amber-400 flex items-center justify-center">
          <AiOutlineClockCircle className="text-2xl text-white" />
        </div>
      </div>

      <div className="bg-[#282941] rounded-sm p-4 flex-1 flex items-center justify-between border-r-2">
        <div className="pr-4">
          <div className="flex items-center">
            <h2 className="text text-xl text-white font-semibold mb-1">
              1.450
            </h2>
          </div>
          <span className="text text-sm text-white font-light">Đã hủy</span>
        </div>
        <div className="rounded-md w-12 h-12 bg-red-600 flex items-center justify-center">
          <TbShoppingCartCancel className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
}

export default PaymentChart;
