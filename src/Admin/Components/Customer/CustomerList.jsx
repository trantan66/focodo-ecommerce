import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomerTableHeader from "./CustomerTableHeader";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { fetchUsersFromAPI } from "../../Services/UserService";

function CustomerList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [customersPerPage, setCustomersPerPage] = useState(6);
  const [totalUsers, setTotalUsers] = useState(0);
  const [cachedUsers, setCachedUsers] = useState({});

  const fetchUsers = useCallback(async () => {
    const cacheKey = `${currentPage}-${customersPerPage}`;

    if (cachedUsers[cacheKey]) {
      setUsers(cachedUsers[cacheKey]);
    } else {
      try {
        const { data, total } = await fetchUsersFromAPI(
          currentPage,
          customersPerPage
        );
        setUsers(data);
        setTotalUsers(total);

        setCachedUsers((prev) => ({
          ...prev,
          [cacheKey]: data,
        }));
      } catch (error) {
        console.error("Lỗi khi lấy người dùng:", error);
      }
    }
  }, [currentPage, customersPerPage, cachedUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredData = useMemo(
    () =>
      users
        .filter((user) =>
          user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    [users, searchTerm]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleProductsPerPageChange = useCallback((value) => {
    setCustomersPerPage(value);
  }, []);
  return (
    <div>
      <div className="mx-4 bg-[#282941] p-4 rounded-md flex flex-col flex-1">
        <CustomerTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          CustomersPerPage={customersPerPage}
          onCustomersPerPageChange={handleProductsPerPageChange}
        />

        <div className="bg-[#282941] pt-3 pb-4 rounded-sm flex-1">
          <strong className="text-white font-medium">
            Danh sách khách hàng
          </strong>
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
                {filteredData.map((customer, index) => (
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
                            {customer.full_name}
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
              total={totalUsers}
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
