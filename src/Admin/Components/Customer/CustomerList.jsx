import React, { useState } from "react";
import CustomerTableHeader from "./CustomerTableHeader";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const data = [];

function generateRandomCustomer(index) {
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

  const phones = [
    "0901234567",
    "0987654321",
    "0912345678",
    "0932123456",
    "0921234567",
    "0909876543",
  ];

  const addresses = [
    "123 Main St, Huế",
    "456 Oak St, Đà Nẵng",
    "789 Pine St, Hồ Chí Minh",
    "321 Maple St, Hà Nội",
    "654 Cedar St, Đà Lạt",
    "987 Birch St, Nha Trang",
  ];

  const randomCustomerName =
    customerNames[Math.floor(Math.random() * customerNames.length)];
  const randomEmail = emails[Math.floor(Math.random() * emails.length)];
  const randomPhone = phones[Math.floor(Math.random() * phones.length)];
  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];

  const randomOrdered = Math.floor(Math.random() * 100);
  const randomTotalSpent = (Math.random() * 1000000).toFixed(2);

  return {
    id: (5748 + index).toString(),
    name: randomCustomerName,
    email: randomEmail,
    phone: randomPhone,
    address: randomAddress,
    image_link:
      "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    ordered: randomOrdered,
    totalspent: randomTotalSpent,
  };
}

for (let i = 1; i <= 100; i++) {
  data.push(generateRandomCustomer(i));
}

function CustomerList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [customersPerPage, setCustomersPerPage] = useState(6);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

  const filteredOrders = data.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.includes(searchTerm)
  );

  const currentCustomers = filteredOrders.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="mx-4 bg-[#282941] p-4 rounded-md flex flex-col flex-1">
        <CustomerTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          CustomersPerPage={customersPerPage}
          onCustomersPerPageChange={setCustomersPerPage}
        />

        <div className="bg-[#282941] pt-3 pb-4 rounded-sm flex-1">
          <strong className="text-white font-medium">Danh sách đơn hàng</strong>
          <div className="mt-3">
            <table className="w-full text-white border-x-gray-400">
              <thead>
                <tr className="bg-[#2E3044] h-10">
                  <td className="pl-2">ID khách hàng</td>
                  <td>Khách hàng</td>
                  <td>Số hóa đơn</td>
                  <td>Tổng chi tiêu</td>
                </tr>
              </thead>
              <tbody className="h-[50vh]">
                {currentCustomers.map((customer, index) => (
                  <tr key={index} className="border-b-2">
                    <td>
                      <Link
                        to={`customerdetail/${customer.id}`}
                        className="text-[#787BFF]"
                      >
                        #{customer.id}
                      </Link>
                    </td>
                    <td>
                      <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                        <img
                          src={customer.image_link}
                          alt="Customer"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="pl-2">
                          <Link
                            to={`customerdetail/${customer.id}`}
                            className="text text-sm font-semibold text-[#787BFF]"
                          >
                            {customer.name}
                          </Link>
                          <div className="text-xs text-white font-light">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{customer.ordered}</td>
                    <td>đ{customer.totalspent}</td>
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
              pageSize={customersPerPage}
              className="custom-pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
