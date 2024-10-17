import React from "react";
import CustomerHeader from "../Components/CustomerDetail/CustomerHeader";
import CustomerInfo from "../Components/CustomerDetail/CustomerInfo";
import CustomerAddress from "../Components/CustomerDetail/CustomerAddress";
import CustomerPaymentMethod from "../Components/CustomerDetail/CustomerPaymentMethod";
import CustomerOrderedTable from "../Components/CustomerDetail/CustomerOrderedTable";

const data = [
  {
    id: "5748",
    name: "Charles Kelley",
    email: "charles.kelley@abc.com",
    phone: "0901234567",
    address: "123 Main St, Huế",
    image_link:
      "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    ordered: 1243,
    totalspent: "2000000",
    status: "Hoạt động",
    username: "charleskelley",
    registered_date: "2024-08-30 17:52:45",
  },
];

const statuses = [
  "ĐÃ ĐẶT",
  "ĐÃ XÁC NHẬN",
  "ĐANG GIAO HÀNG",
  "ĐÃ GIAO HÀNG",
  "ĐÃ HỦY",
];
const payments = ["ĐÃ THANH TOÁN", "CHƯA THANH TOÁN", "ĐÃ HỦY"];

const generateRandomOrder = () => {
  const randomid = Math.floor(Math.random() * 10000) + 500;
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomPayment = payments[Math.floor(Math.random() * payments.length)];
  const randomSpent = Math.floor(Math.random() * 100000) + 500;
  const randomDate = new Date(
    2020 + Math.floor(Math.random() * 5),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1,
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60),
    Math.floor(Math.random() * 60)
  );

  return {
    orderid: randomid.toString(),
    order_datetime: randomDate.toISOString().replace("T", " ").split(".")[0],
    payment: randomPayment,
    status: randomStatus,
    spent: randomSpent,
  };
};

const dataorder = [];
for (let i = 1; i <= 100; i++) {
  dataorder.push(generateRandomOrder());
}

function CustomerDetail() {
  return (
    <div className="pl-4 flex flex-col flex-1">
      <CustomerHeader customerdata={data} />
      <div className="pt-3 pb-4 flex flex-row">
        <div className="flex flex-col flex-[1]">
          <CustomerInfo customerdata={data} />
          <div className="bg-[#282941] p-4 mr-4 mt-4 rounded-sm text-white"></div>
        </div>
        <div className="flex flex-col flex-[2]">
          <div className="flex flex-row">
            <CustomerAddress />
            <CustomerPaymentMethod />
          </div>
          <CustomerOrderedTable data={dataorder} />
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
