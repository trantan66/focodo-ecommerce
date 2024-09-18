import React from "react";
import { FaWallet } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";import { IoBagHandle } from "react-icons/io5";

function DashboardStatsGrid() {
  return (
    <div className="flex gap-4 w-full">
      <BoxWrapper>
        <div className="rounded-full w-12 h-12 bg-sky-500 flex items-center justify-center">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text text-sm text-gray-500 font-light">
            Tổng doanh thu
          </span>
          <div className="flex items-center">
            <strong className="text text-xl text-gray-700 font-semibold">
              3.450.000đ
            </strong>
            <span className="text text-sm text-green-500"> +268.000đ</span>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className="rounded-full w-12 h-12 bg-red-500 flex items-center justify-center">
          <GiExpense  className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text text-sm text-gray-500 font-light">
            Tổng chi phí
          </span>
          <div className="flex items-center">
            <strong className="text text-xl text-gray-700 font-semibold">
              3.450.000đ
            </strong>
            <span className="text text-sm text-green-500"> +268.000đ</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full w-12 h-12 bg-yellow-500 flex items-center justify-center">
          <FaUserCheck  className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text text-sm text-gray-500 font-light">
            Tổng khách hàng
          </span>
          <div className="flex items-center">
            <strong className="text text-xl text-gray-700 font-semibold">
              3.450.000đ
            </strong>
            <span className="text text-sm text-green-500"> +268.000đ</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full w-12 h-12 bg-green-600 flex items-center justify-center">
          <FaWallet className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text text-sm text-gray-500 font-light">
            Tổng hóa đơn
          </span>
          <div className="flex items-center">
            <strong className="text text-xl text-gray-700 font-semibold">
              3.450.000đ
            </strong>
            <span className="text text-sm text-green-500"> +268.000đ</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

export default DashboardStatsGrid;

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
