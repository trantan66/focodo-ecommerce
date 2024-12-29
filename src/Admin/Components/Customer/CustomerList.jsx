import React, { useCallback, useEffect, useState } from 'react';
import CustomerTableHeader from './CustomerTableHeader';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { fetchUsersFromAPI, searchUsersFromAPI } from '../../../Services/UserService';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { formatPhoneNumber } from '../../../utils/FormatPhoneNumber';

function CustomerList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [customersPerPage, setCustomersPerPage] = useState(6);
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchUsers = useCallback(async () => {
        try {
            if (searchTerm) {
                const { data, total } = await searchUsersFromAPI(searchTerm, currentPage, customersPerPage);
                setUsers(data);
                setTotalUsers(total);
            } else {
                const { data, total } = await fetchUsersFromAPI(currentPage, customersPerPage);
                setUsers(data);
                setTotalUsers(total);
            }
        } catch (error) {
            console.error('Lỗi khi lấy hóa đơn:', error);
        }
    }, [currentPage, customersPerPage, searchTerm]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }, []);

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
                    onSearchChange={handleSearch}
                    CustomersPerPage={customersPerPage}
                    onCustomersPerPageChange={handleProductsPerPageChange}
                />

                <div className="bg-[#282941] pt-3 pb-4 rounded-sm flex-1">
                    <strong className="text-white font-medium">Danh sách khách hàng</strong>
                    <div className="mt-3">
                        <table className="w-full text-white border-x-gray-400">
                            <thead>
                                <tr className="bg-[#2E3044] h-10">
                                    <td className="pl-2">ID khách hàng</td>
                                    <td>Khách hàng</td>
                                    <td>Số điện thoại</td>
                                    <td className="text-center">Số hóa đơn</td>
                                    <td>Tổng chi tiêu</td>
                                </tr>
                            </thead>
                            <tbody className="h-[50vh]">
                                {users.map((customer, index) => (
                                    <tr key={index} className="border-b-2 max-h-14">
                                        <td>
                                            <Link to={`customerdetail/${customer.id}`} className="text-[#787BFF]">
                                                #{customer.id}
                                            </Link>
                                        </td>
                                        <td>
                                            <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                                                <img
                                                    src={
                                                        customer.avatar
                                                            ? customer.avatar
                                                            : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'
                                                    }
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
                                        <td>{formatPhoneNumber(customer.phone)}</td>
                                        <td className="text-center">{customer.quantity_order}</td>
                                        <td>
                                            {customer.total_money
                                                ? formatCurrency(customer.total_money)
                                                : formatCurrency(0)}
                                        </td>
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
