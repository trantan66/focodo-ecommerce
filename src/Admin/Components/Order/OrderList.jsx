import React, { useState } from "react";
import OrderTableHeader from "./OrderTableHeader";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { getPaymentStatus } from "../../Lib/Utils/PaymentStatus";
import { getOrderStatus } from "../../Lib/Utils/OrderStatus";

const data = [];

function generateRandomOrder(index) {
  const customerNames = [
    "Charles Kelley",
    "Laura Montoya",
    "Deanna Meyer",
    "Elaine Walls",
    "Jason Gentry",
    "Lisa Peterson",
  ];
  
  const emails = [
    "mark45@yahoo.com",
    "gentryjason@hotmail.com",
    "jacksonsarah@yahoo.com",
    "petersonlisa@carter.com",
    "montoya22@gmail.com",
    "charles.kelley@abc.com",
  ];
  
  const statuses = ["ĐÃ ĐẶT", "ĐÃ XÁC NHẬN", "ĐANG GIAO HÀNG", "ĐÃ GIAO HÀNG", "ĐÃ HỦY"];
  const payments = ["ĐÃ THANH TOÁN", "CHƯA THANH TOÁN", "ĐÃ HỦY"];
  
  const randomCustomerName = customerNames[Math.floor(Math.random() * customerNames.length)];
  const randomEmail = emails[Math.floor(Math.random() * emails.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomPayment = payments[Math.floor(Math.random() * payments.length)];
  
  const orderDatetime = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().slice(0, 19).replace('T', ' ');

  return {
    orderid: (5748 + index).toString(),
    order_datetime: orderDatetime,
    customer: {
      name: randomCustomerName,
      email: randomEmail,
      image_link: "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    },
    payment: randomPayment,
    status: randomStatus,
  };
}

for (let i = 1; i <= 100; i++) {
  data.push(generateRandomOrder(i));
}


function OrderList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordersPerPage, setOrdersPerPage] = useState(6);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const filteredOrders = data.filter(
    (order) =>
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderid.includes(searchTerm)
  );

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mx-4 bg-[#282941] p-4 rounded-md flex flex-col flex-1">
        <OrderTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          ordersPerPage={ordersPerPage}
          onOrdersPerPageChange={setOrdersPerPage}
        />

        <div className="bg-[#282941] pt-3 pb-4 rounded-sm flex-1">
          <strong className="text-white font-medium">Danh sách đơn hàng</strong>
          <div className="mt-3">
            <table className="w-full text-white border-x-gray-400">
              <thead>
                <tr className="bg-[#2E3044] h-10">
                  <td className="pl-2">Mã đơn hàng</td>
                  <td>Ngày đặt</td>
                  <td>Khách hàng</td>
                  <td>Thanh toán</td>
                  <td>Trạng thái</td>
                </tr>
              </thead>
              <tbody className="h-[50vh]">
                {currentOrders.map((order, index) => (
                  <tr key={index} className="border-b-2">
                    <td>
                      <Link
                        to={`orderdetail/${order.orderid}`}
                        className="text-[#787BFF]"
                      >
                        #{order.orderid}
                      </Link>
                    </td>
                    <td>{order.order_datetime}</td>

                    <td>
                      <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                        <img
                          src={order.customer.image_link}
                          alt="Customer"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="pl-2">
                          <Link
                            to={`orderdetail/${order.orderid}`}
                            className="text text-sm font-semibold text-[#787BFF]"
                          >
                            {order.customer.name}
                          </Link>
                          <div className="text-xs text-white font-light">
                            {order.customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{getPaymentStatus(order.payment)}</td>
                    <td>{getOrderStatus(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <Pagination
              showSizeChanger={false}
              current={currentPage}
              onChange={handlePageChange}
              total={filteredOrders.length}
              pageSize={ordersPerPage}
              className="custom-pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
