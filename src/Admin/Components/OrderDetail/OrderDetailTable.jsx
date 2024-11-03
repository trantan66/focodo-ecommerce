import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/FormatCurrency';

function OrderDetailTable({ data }) {
    return (
        <div className="bg-[#282941] pt-3 p-4 mr-4 rounded-sm flex-[2] text-white">
            <strong className="text-white font-medium">Chi tiết đơn hàng</strong>
            <div className="mt-3">
                <table className="w-full text-white border-x-gray-400">
                    <thead>
                        <tr className="bg-[#2E3044] h-10">
                            <td className="pl-2">Sản phẩm</td>
                            <td>Giá</td>
                            <td>Số lượng</td>
                            <td>Tổng</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data.order_details) && data.order_details.length > 0 ? (
                            data.order_details.map((items, index) => (
                                <tr key={index} className="border-b-2">
                                    <td>
                                        <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                                            <img
                                                src={items.product.image}
                                                alt="Product"
                                                className="w-10 h-10 rounded-sm object-cover"
                                            />
                                            <div className="pl-2">
                                                <Link
                                                    to={`/admin/product/productdetail/${items.product.id}`}
                                                    className="text text-sm font-semibold text-[#787BFF]"
                                                >
                                                    {items.product.name}
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{formatCurrency(items.unit_price)}</td>
                                    <td>{items.quantity}</td>
                                    <td>{formatCurrency(items.total_price)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col items-end pt-3">
                <div className="grid grid-cols-2 gap-3">
                    <span>Tổng tiền:</span>
                    <span className="text-left">{formatCurrency(data.total_price)}</span>

                    <span>Discount:</span>
                    <span className="text-left">{data.discount_price}%</span>

                    <span>Ship:</span>
                    <span className="text-left">{formatCurrency(data.shipping_price)}</span>

                    <span>Thành tiền:</span>
                    {formatCurrency(data.final_price)}
                </div>
            </div>
        </div>
    );
}

export default OrderDetailTable;
