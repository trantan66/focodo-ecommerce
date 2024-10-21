import React, { useCallback, useEffect, useMemo, useState } from "react";
import OrderTableHeader from "./OrderTableHeader";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { getPaymentStatus } from "../../Lib/Utils/PaymentStatus";
import { getOrderStatus } from "../../Lib/Utils/OrderStatus";
import { fetchOrdersFromAPI } from "../../../Services/OrderService";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordersPerPage, setOrdersPerPage] = useState(6);

  const [totalOrders, setTotalOrders] = useState(0);
  const [cachedOrders, setCachedOrders] = useState({});

  const fetchOrders = useCallback(async () => {
    const cacheKey = `${currentPage}-${ordersPerPage}`;

    if (cachedOrders[cacheKey]) {
      setOrders(cachedOrders[cacheKey]);
    } else {
      try {
        const { data, total } = await fetchOrdersFromAPI(
          currentPage,
          ordersPerPage
        );
        setOrders(data);
        setTotalOrders(total);

        setCachedOrders((prev) => ({
          ...prev,
          [cacheKey]: data,
        }));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  }, [currentPage, ordersPerPage, cachedOrders]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredData = useMemo(
    () =>
      orders.filter((order) =>
        order.id_order.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [orders, searchTerm]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleOrdersPerPageChange = useCallback((value) => {
    setOrdersPerPage(value);
  }, []);

  return (
    <div>
      <div className="mx-4 bg-[#282941] p-4 rounded-md flex flex-col flex-1">
        <OrderTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          ordersPerPage={ordersPerPage}
          onOrdersPerPageChange={handleOrdersPerPageChange}
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
                {filteredData.map((order, index) => (
                  <tr key={index} className="border-b-2">
                    <td>
                      <Link
                        to={`orderdetail/${order.orderid}`}
                        className="text-[#787BFF]"
                      >
                        #{order.id_order}
                      </Link>
                    </td>
                    <td>
                      {order.order_date
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/") +
                        " " +
                        order.order_date.split("T")[1].split(".")[0]}
                    </td>

                    <td>
                      <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                        <img
                          src={"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"}
                          alt="Customer"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="pl-2">
                          <Link
                            to={`/admin/product/productdetail/${""}`}
                            className="text text-sm font-semibold text-[#787BFF]"
                          >
                            {""}
                          </Link>
                          <div className="text-xs text-white font-light">
                            {""}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{getPaymentStatus(order.payment_status)}</td>
                    <td>{getOrderStatus(order.order_status)}</td>
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
              total={totalOrders}
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
