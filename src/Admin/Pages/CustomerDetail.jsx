import React from "react";
import CustomerHeader from "../Components/CustomerDetail/CustomerHeader";

const data = [
  {
    id: "5748",
    name: "Charles Kelley",
    email: "charles.kelley@abc.com",
    phone: "0901234567",
    address: "123 Main St, Huế",
    image_link:
      "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    ordered: 12,
    totalspent: "2000000.00",
    status: "active",
    username: "charleskelley",
    registered_date: "2024-08-30 17:52:45",
  },
];

function CustomerDetail() {
  return (
    <div className="pl-4 flex flex-col flex-1">
      <CustomerHeader customerdata={data} />
      <div className="pt-3 pb-4 flex flex-row">
        <div className="flex flex-col flex-[1]">
          <div className="bg-[#282941] p-4 mr-4 rounded-sm text-white"></div>
          <div className="bg-[#282941] p-4 mr-4 mt-4 rounded-sm text-white"></div>
        </div>
        <div className="flex flex-col flex-[2]">
          <div className="flex flex-row">
            <div className="bg-[#282941] p-4 mr-4 rounded-sm text-white flex-[1]"></div>
            <div className="bg-[#282941] p-4 mr-4 rounded-sm text-white flex-[1]"></div>
          </div>
          <div className="bg-[#282941] p-4 mr-4 mt-4 rounded-sm text-white"></div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
