import React from "react";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../../Lib/Utils/OrderStatus";
import { getPaymentStatus } from "../../Lib/Utils/PaymentStatus";

const data = [
  {
    orderid: "5748",
    order_datetime: "2024-05-25 19:17:37",
    customer: {
      id: "5748",
      name: "Charles Kelley",
      email: "mark45@yahoo.com",
      image_link:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    },
    payment: "ĐÃ HỦY",
    status: "ĐÃ ĐẶT",
  },
  {
    orderid: "3829",
    order_datetime: "2022-12-06 15:05:05",
    customer: {
      id: "5748",
      name: "Laura Montoya",
      email: "gentryjason@hotmail.com",
      image_link:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    },
    payment: "ĐÃ THANH TOÁN",
    status: "ĐÃ XÁC NHẬN",
  },
  {
    orderid: "7068",
    order_datetime: "2022-11-13 03:10:44",
    customer: {
      id: "5748",
      name: "Deanna Meyer",
      email: "jacksonsarah@yahoo.com",
      image_link:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    },
    payment: "CHƯA THANH TOÁN",
    status: "ĐANG GIAO HÀNG",
  },
  {
    orderid: "8856",
    order_datetime: "2024-04-21 19:12:12",
    customer: {
      id: "5748",
      name: "Elaine Walls",
      email: "petersonlisa@carter.com",
      image_link:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    },
    payment: "CHƯA THANH TOÁN",
    status: "ĐÃ GIAO HÀNG",
  },
  {
    orderid: "3829",
    order_datetime: "2022-12-06 15:05:05",
    customer: {
      id: "5748",
      name: "Laura Montoya",
      email: "gentryjason@hotmail.com",
      image_link:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    },
    payment: "ĐÃ THANH TOÁN",
    status: "ĐÃ XÁC NHẬN",
  },
  {
    orderid: "8856",
    order_datetime: "2024-04-21 19:12:12",
    customer: {
      id: "5748",
      name: "Elaine Walls",
      email: "petersonlisa@carter.com",
      image_link:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    },
    payment: "CHƯA THANH TOÁN",
    status: "ĐÃ GIAO HÀNG",
  },
  {
    orderid: "5748",
    order_datetime: "2024-05-25 19:17:37",
    customer: {
      id: "5748",
      name: "Charles Kelley",
      email: "mark45@yahoo.com",
      image_link:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    },
    payment: "ĐÃ HỦY",
    status: "ĐÃ ĐẶT",
  },
];

function RecentOrder() {
  return (
    <div className="bg-[#282941] px-4 pt-3 pb-4 rounded-sm flex-1">
      <strong className="text-white font-medium">Order</strong>
      <div className="mt-3">
        <table className="w-full text-white border-x-gray-400">
          <thead>
            <tr className="h-12 bg-[#2E3044]">
              <td className="pl-1">ORDER</td>
              <td>Thời gian đặt</td>
              <td>Khách hàng</td>
              <td>Thanh toán</td>
              <td>Trạng thái</td>
            </tr>
          </thead>
          <tbody className="h-[50vh] ">
            {data.map((order) => (
              <tr key={order.id} className="border-b-2">
                <td>
                  <Link
                    to={`order/orderdetail/${order.orderid}`}
                    className="text-[#787BFF]"
                  >
                    #{order.orderid}
                  </Link>
                </td>
                <td>{order.order_datetime}</td>
                <td>
                  <div className="rounded-sm flex-1 flex items-center">
                    <img
                      src={order.customer.image_link}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="pl-2">
                      <Link
                        to={`customer/customerdetail/${order.customer.id}`}
                        className="text text-sm font-semibold text-[#787BFF]"
                      >
                        {order.customer.name}
                      </Link>
                      <div className="flex items-center">
                        <strong className="text-xs textsize text-gray-400 font-light">
                          {order.customer.email}
                        </strong>
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
    </div>
  );
}

export default RecentOrder;
